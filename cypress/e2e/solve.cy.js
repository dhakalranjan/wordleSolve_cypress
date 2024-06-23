//To get today's date
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayDate = year + "-" + month + "-" + day;

describe('Solving Wordle Game', () => {
    it('all the steps', () => {
        cy.visit("https://www.nytimes.com/games/wordle/index.html")
        cy.get('[data-testid="Play"]').click()
        cy.get('.Modal-module_closeIcon__TcEKb').click()

        cy.request(`https://www.nytimes.com/svc/wordle/v2/${todayDate}.json`).then((response) => {
            let answer = response.body.solution;
            cy.log(answer);

            // Type each letter of the answer into the first row
            for (let i = 0; i < answer.length; i++) {
                cy.get('.Row-module_row__pwpBq[aria-label="Row 1"]')
                    .within(() => {
                        cy.get('div[role="img"]').eq(i)
                            .trigger('keydown', { key: answer[i] })

                    });
            }

            // Press Enter to submit the row
            cy.get('.Row-module_row__pwpBq[aria-label="Row 1"]')
                .trigger('keydown', { key: 'Enter' })

        });
    });
});
