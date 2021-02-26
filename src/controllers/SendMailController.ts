import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailServices from "../services/SendMailServices";
import { resolve } from 'path';
import { AppError } from "../errors/AppError";

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUserRepository = getCustomRepository(SurveysUsersRepository);

        const userCurrent = await usersRepository.findOne({email});
        if (!userCurrent) {
            throw new AppError("User does not exists");
        }

        const surveyCurrent = await surveysRepository.findOne({id: survey_id});
        if (!surveyCurrent) {
            throw new AppError("Survey does not exists!");
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        
        const surveyUserAlreadyExists = await surveysUserRepository.findOne({
            where: {user_id: userCurrent.id, value: null, survey_id: surveyCurrent.id},
            relations: ["user","survey"]
        });
        const variables = {
            name: userCurrent.name,
            title: surveyCurrent.title,
            description: surveyCurrent.description,
            id: "",
            link: process.env.URL_MAIL
        };
        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailServices.execute(email, surveyCurrent.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveysUserRepository.create({
            user_id: userCurrent.id, survey_id: survey_id
        });
        await surveysUserRepository.save(surveyUser);

        variables.id = surveyUser.id;
        await SendMailServices.execute(email, surveyCurrent.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController };