describe('Testes no Parabank', () => {
    const baseUrl = 'https://parabank.parasoft.com';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('1. Testa funcionalidade de registrar usuário', () => {
        cy.contains('Register').click();
        cy.get('#customer\\.firstName').type('teste');
        cy.get('#customer\\.lastName').type('rafael');
        cy.get('#customer\\.address\\.street').type('123 testando rua');
        cy.get('#customer\\.address\\.city').type('testando cidade');
        cy.get('#customer\\.address\\.state').type('RS');
        cy.get('#customer\\.address\\.zipCode').type('9444748');
        cy.get('#customer\\.phoneNumber').type('1234567890');
        cy.get('#customer\\.ssn').type('545454545');
        cy.get('#customer\\.username').type('rafinha3');
        cy.get('#customer\\.password').type('1234');
        cy.get('#repeatedPassword').type('1234');
        cy.get('input[value="Register"]').click();
        cy.contains('Your account was created successfully').should('be.visible');
    });

    it('2. Verifica se a página inicial carrega corretamente', () => {
        cy.contains('Customer Login').should('be.visible');
    });
  
    it('3. Realiza login com credenciais inválidas', () => {
        cy.get('input[name="username"]').type('usuario_invalido');
        cy.get('input[name="password"]').type('senha_invalida');
        cy.get('input[value="Log In"]').click();
        cy.contains('An internal error has occurred and has been logged.').should('be.visible');
    });
  
    it('4. Realiza login com credenciais válidas', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Accounts Overview').should('be.visible');
    });
  
    it('5. Verifica link "Register"', () => {
        cy.contains('Register').click();
        cy.url().should('include', '/register.htm');
    });
  
    it('6. Verifica o botão "Forgot login info?"', () => {
        cy.contains('Forgot login info?').click();
        cy.url().should('include', '/lookup.htm');
    });
  
    it('7. Valida mensagem de erro ao registrar com dados incompletos', () => {
        cy.contains('Register').click();
        cy.get('#customer\\.firstName').type('Teste dados incompletos');
        cy.get('input[value="Register"]').click();
        cy.contains('Last name is required.').should('be.visible');
    });
  
    it('8. Testa navegação entre as abas principais', () => {
        cy.contains('Home').click();
        cy.contains('About Us').click();
        cy.url().should('include', '/about.htm');
        cy.contains('Services').click();
        cy.url().should('include', '/parabank/services.htm');
        cy.contains('Admin Page').click();
        cy.url().should('include', '/parabank/admin.htm');
    });
  
    it('9. Testa logout', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Accounts Overview').should('be.visible');
        cy.contains('Log Out').click();
        cy.contains('Customer Login').should('be.visible');
    });
  
    it('9. Verifica erro de login com senha incorreta', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('918238761278321');
        cy.get('input[value="Log In"]').click();
        cy.contains('An internal error has occurred and has been logged.').should('be.visible');
    });

    it('10. Verifica se os dados das contas são exibidos corretamente após o login', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Accounts Overview').should('be.visible');
        cy.get('table').should('exist'); 
        cy.get('table tbody tr').should('have.length.greaterThan', 0); 
        cy.get('table tbody tr').first().within(() => {
            cy.get('td').eq(0).should('not.be.empty');
            cy.get('td').eq(1).should('not.be.empty');
        });
    });
    
    
    it('11. Testa o botão "Open New Account" para criar uma nova conta', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Open New Account').click();
        cy.url().should('include', '/openaccount.htm');
        cy.get('#type').select('CHECKING'); 
        cy.get('#fromAccountId').select(0); 
        cy.get('input[value="Open New Account"]').click();
        cy.contains('Congratulations, your account is now open.').should('be.visible');
    });
    
    
    it('12. Redireciona para login ao acessar transferência sem autenticação', () => {
        cy.visit(`${baseUrl}/parabank/transfer.htm`, { failOnStatusCode: false }); 
        cy.contains('An internal error has occurred and has been logged.').should('be.visible');
        cy.contains('Customer Login').should('be.visible'); 
    });    
    
    it('13. Testa formulário de transferência de fundos após login', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Transfer Funds').click();
        cy.get('#amount').type('500');
        cy.get('#fromAccountId').select(0);
        cy.get('#toAccountId').select(0);
        cy.get('input[value="Transfer"]').click();
        cy.contains('Transfer Complete!').should('be.visible');
    });
    
    it('14. Verifica mensagem de erro em transferência com valor vazio', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Transfer Funds').click();
        cy.get('input[value="Transfer"]').click();
        cy.contains('An internal error has occurred and has been logged.').should('be.visible');
    });

    it('15. Testa logout', () => {
        cy.get('input[name="username"]').type('rafinha');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[value="Log In"]').click();
        cy.contains('Accounts Overview').should('be.visible');
        cy.contains('Log Out').click();
        cy.contains('Customer Login').should('be.visible');
    });

  });
  