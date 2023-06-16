describe('Fazer pesquisa de produtos', ()=> {
    beforeEach(()=> {
        // Com o objetivo de visitar a mesma URL no início de todos os testes, 
        // incluímos essa ação na nossa função beforeEach, para que ela seja executada antes de cada teste.
        cy.visit('/')
    })

    it('Pesquisa de produto bem-sucedida', () => {
        // Dado que o usuário está na página inicial do site de e-commerce
        // Quando o usuário clica na barra de pesquisa
        // E digita o nome do produto desejado
        // E clica no botão de pesquisa
        // Então o usuário é redirecionado para a página de resultados de pesquisa
        // E todos os resultados mostrados correspondem ao termo de pesquisa

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com')
        cy.get('.a-button-inner > #continue').click()
        cy.get('#ap_password').type('123')
        cy.get('#signInSubmit').click()
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'Olá, Exemplo')

        cy.get('#twotabsearchtextbox').type('Alexa Echo')
        cy.get('#nav-search-submit-button').click()
       
    })

    it('Pesquisa de produto com muitos resultados', () => {
        //Dado que o usuário está na página inicial do site de e-commerce
        //Quando o usuário clica na barra de pesquisa
        //E digita o produto de pesquisa que corresponde a vários produtos
        //E clica no botão de pesquisa
        //Então o usuário é redirecionado para a página de resultados de pesquisa
        //E todos os produtos correspondentes são exibidos em várias páginas
        //E o usuário pode navegar pelos resultados usando a paginação

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com')
        cy.get('.a-button-inner > #continue').click()
        cy.get('#ap_password').type('123')
        cy.get('#signInSubmit').click()
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'Olá, Exemplo')

        cy.get('#twotabsearchtextbox').type('Sapato')
        cy.get('#nav-search-submit-button').click()

        //Navegar pelas páginas
        cy.get('.s-pagination-next').click()
        cy.get('.s-pagination-next').click()
        cy.get('.s-pagination-next').click()

    })    

    it('Pesquisa sem resultado', () => {
        //Dado que estou na página inicial
        //Quando eu digito "abcd1234" no campo de pesquisa
        //E eu clico no botão de pesquisa
        //Então vejo uma mensagem informando que nenhum resultado foi encontrado

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com')
        cy.get('.a-button-inner > #continue').click()
        cy.get('#ap_password').type('123')
        cy.get('#signInSubmit').click()
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'Olá, Exemplo')

        cy.get('#twotabsearchtextbox').type('abcd1234')
        cy.get('#nav-search-submit-button').click()
        cy.get('.s-no-outline > .a-size-base').should('contain.text', 'Tente verificar a ortografia ou usar termos mais genéricos')

    })

    it.only('Pesquisa com campo vazio', () => {
        //Dado que estou na página inicial
        //Quando eu deixo o campo de pesquisa vazio
        //E eu clico no botão de pesquisa
        //Então vejo uma mensagem informando que é necessário digitar um termo de pesquisa

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com')
        cy.get('.a-button-inner > #continue').click()
        cy.get('#ap_password').type('123')
        cy.get('#signInSubmit').click()
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'Olá, Exemplo')

        cy.get('#nav-search-submit-button').click()

    })

})    