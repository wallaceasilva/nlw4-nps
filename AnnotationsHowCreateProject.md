Configuração do Ambiente

    https://www.notion.so/Configura-es-do-ambiente-Node-js-ae9fea3f78894139af4268d198294e2a

    Três etapas principais de instalação para windows:
        - Node + NPM;
            Para o Windows utilizar o gerenciador de pacotes Chocolatey (https://chocolatey.org/)
            Powershell
                - Busque no campo de busca do Windows por "Windows Powershell", clique com o botão direito em cima do programa e escolha a opção "Executar como administrador".
                - O Powershell trabalha com um esquema de autorizações (conhecido como `Execution Policy`) para execução de scripts e, por isso, precisamos verificar se o presente no sistema está compatível com o que o Chocolatey precisa. 
                
                - Execute o seguinte comando: Get-ExecutionPolicy
                    Caso ele retorne `Restricted`, execute o comando: Set-ExecutionPolicy RemoteSigned
                
                    E escolha a opção `[A] Sim para Todos`
                        Caso o comando acima apresente erro, tente usar:
                        `Set-ExecutionPolicy Bypass -Scope Process`

                - Verifique se alteração de permissão ocorreu com sucesso executando novamente o comando: Get-ExecutionPolicy

                - Alterada a permissão, basta instalar o "Chocolatey" com o comando:
                Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

                    Caso o comando acima apresente um erro, verifique se a sua máquina atende às requisições mínimas

                        `Windows 7+ / Windows Server 2003+
                        PowerShell v3+
                        .NET Framework 4.5+`

                    Caso o erro apresentado seja `Exceção ao definir "SecurityProtocol": "Não é possível converter o valor "3312"`, siga esse guia: https://blog.chocolatey.org/2020/01/remove-support-for-old-tls-versions/

                - Após o fim da instalação, feche e abra o powershell como administrador novamente e execute: choco -v

                    Caso ele retorne a versão do **Chocolatey**, a instalação foi um sucesso.
                
                - Para finalizar, basta instalar a versão LTS mais recente do Node com o seguinte comando: cinst nodejs-lts

                    E escolha a opção `[A]ll - yes to all`

                - Após o fim da instalação, feche e abra o powershell como administrador novamente e execute:
                node -v
                npm -v

                Caso retorne as versões do Node e npm, sua instalação foi um sucesso.


        - Yarn;
            Para instalar o Yarn 1 no Windows siga os seguintes passos, execute o comando no Powershell (como admin):
            cinst yarn

            E escolha a opção `[A]ll - yes to all`. 

            Feche e abra o terminal novamente, em seguida rode o comando:
            yarn --version

            Caso retorne a versão do Yarn (acima de 1.0, abaixo de 2.0), a instalação ocorreu com sucesso.
                * Possíveis problemas
                Ao usar o Yarn no Windows para instalar as dependências nos seus projetos, atente-se para que seu nome de usuário não possua espaços, pois nesse caso, alguns erros poderão ocorrer durante esse processo, como por exemplo: com o nome "Diego Fernandes", o caminho até a pasta do projeto (supondo que estivesse na pasta *Documents*) seria algo como `C:\Users\Diego Fernandes\Documents\NLW\Projeto` e nesse caso, uma solução seria criar o projeto já na raiz do **Disco C**. Dessa forma, o caminho até a pasta não passaria pelo nome do usuário, ficando `C:\NLW\Projeto`.


        - Visual Studio Code e configurações.

            Para instalar o editor de texto Visual Studio Code em qualquer um dos 3 sistemas operacionais, basta acessar o site (https://code.visualstudio.com/), baixar e rodar o executável.


    Crie uma pasta em um diretorio que deseja para iniciar o projeto.

    Pelo CMD ou Powershell, navegue até sua pasta e abra o VSCode com comando "code ."

    Configurando seu projeto com instalação dos pacotes

        No terminal do VSCode digite:
            yarn init -y
            para criação do arquivo de configuração do projeto package.json

            yarn add express
            yarn add @types/express -D
            para instalação de dependencias do projeto. O Express é um microframework

            yarn add typescript -D
            yarn tsc --init
            para instalação do typescript e depois inicialização do typescript dentro do projeto e criação do arquivo tsconfig.json

            yarn ts-node-dev -D
            converte a execução do projeto de javascript para typescript

            ---
            Instalação do banco de dados (TYPEORM + SQLite 3 | https://typeorm.io/#/) 
            yarn add typeorm reflect-metadata
            yarn add sqlite3

                Para criação das migrations: yarn typeorm migration:create -n {NomeMigration}
                Para rodar as migrations: yarn typeorm migration:run

            yarn add uuid
            yarn add @types/uuid -D
            para biblioteca uuid (criação de id)

            ---
            Instalação de bibliotecas para teste do código
            yarn add jest
            yarn add @types/jest -D
            
            yarn jest --init
            * neste comando terão algumas perguntas para responder:
                - Would you like to use Jest when running "test" script in package.json? resposta [Y] para yes
                - Would you like to use Typescript for the configuration file? resposta [Y] para yes
                - Choose the test environment that will be used for testing. resposta "node"
                - Do you want Jest to add coverage reports? resposta [N] para no
                - Which provider should be used to instrument code for coverage? respota "v8"
                - Automatically clear mock calls and instances between every test? resposta [Y] para yes

            yarn add ts-jest -D

            yarn add supertest
            yarn add @types/supertest -D

            yarn test
            roda os testes no código.

            ---
            Instalação de bibliotecas para envio de e-mail (https://ethereal.email)
            yarn add nodemailer
            yarn add @types/nodemailer

            template (https://handlebarsjs.com/guide/)
            yarn add handlebars
    