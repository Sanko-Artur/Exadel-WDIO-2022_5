Feature: ATM withdraw
    As an Account Holder
    In Order to get money
    I want to withdraw cash from an ATM

    Scenario Outline: <nameOfScenario>
        Given my account balance is "<myAccountBalance>"
        And the ATM contains "<ATMContains>"
        When I withdraw "<withdrwa>"
        Then I get "<message>" message
        Examples:
            | nameOfScenario                           | myAccountBalance | ATMContains | withdrwa | message                               |
            | Account has sufficient funds             | 500              | 600         | 50       | Take your money!                      |
            | Account has insufficient funds           | 500              | 600         | 550      | You don't have enough money!          |
            | The ATM has insufficient amount of money | 500              | 150         | 300      | The machine is not have enough money! |

# npx wdio -f cucumber --spec features/HW_1/atmOutlines.feature