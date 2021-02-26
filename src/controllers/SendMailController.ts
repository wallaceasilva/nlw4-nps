import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailServices from "../services/SendMailServices";
import { resolve } from 'path';

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUserRepository = getCustomRepository(SurveysUsersRepository);

        const userCurrent = await usersRepository.findOne({email});
        if (!userCurrent) {
            return response.status(400).json({
                error: "User does not exists"
            });
        }

        const surveyCurrent = await surveysRepository.findOne({id: survey_id});
        if (!surveyCurrent) {
            return response.status(400).json({
                error: "Survey does not exists!"
            });
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        const variables = {
            name: userCurrent.name,
            title: surveyCurrent.title,
            description: surveyCurrent.description,
            user_id: userCurrent.id,
            link: process.env.URL_MAIL
        };

        const surveyUserAlreadyExists = await surveysUserRepository.findOne({
            where: [{user_id: userCurrent.id}, {value: null}],
            relations: ["user","survey"]
        });
        if (surveyUserAlreadyExists) {
            await SendMailServices.execute(email, surveyCurrent.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveysUserRepository.create({
            user_id: userCurrent.id, survey_id: survey_id
        });
        await surveysUserRepository.save(surveyUser);

        await SendMailServices.execute(email, surveyCurrent.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController }