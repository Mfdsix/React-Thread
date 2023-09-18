const baseUrl = 'http://localhost:5173'

const time = new Date().getTime()
const username = 'user' + time
const email = time + '@mail.com'
const password = 'super-secret-123'

describe('register account', () => {

  beforeEach(() => {
    cy.visit(`${baseUrl}/register`)
  })

  it('show page correctly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible')
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')

    cy.get('button').contains(/^Register$/).should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.disabled');
  })

  it('enable register button', () => {
    cy.get('input[placeholder="Name"]').type("username")
    cy.get('input[placeholder="Email"]').type("email@mail.com")
    cy.get('input[placeholder="Password"]').type("password")

    cy.get('button').contains(/^Register$/).should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.enabled');
  })

  it('registered successfully', () => {
    cy.get('input[placeholder="Name"]').type(username)
    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)

    cy.get('button').contains(/^Register$/).click();
    cy.url().should("be.equals", `${baseUrl}/`)
  })
})

describe('login account', () => {

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
  })

  it('show page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')

    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.disabled');
  })

  it('enable login button', () => {
    cy.get('input[placeholder="Email"]').type("email@mail.com")
    cy.get('input[placeholder="Password"]').type("password")

    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.enabled');
  })

  it('login failed', () => {
    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(email)

    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  })

  it('login successfully', () => {
    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)

    cy.get('button').contains(/^Login$/).click();
    cy.url().should("be.equals", `${baseUrl}/`)
  })
})

describe('logout account', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
  })

  it('logout successfully', () => {
    // login process
    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)

    cy.get('button').contains(/^Login$/).click();
    cy.url().should("be.equals", `${baseUrl}/`)
    
    cy.get('button[id="btn-logout"]').should('be.visible')
    cy.get('button[id="btn-logout"]').click()
    
    cy.on('window:confirm', () => true)

    cy.get('a').contains(/^Login$/).should('be.visible');
    cy.get('a').contains(/^Login$/).click()

    cy.url().should("be.equals", `${baseUrl}/login`)
  })
})