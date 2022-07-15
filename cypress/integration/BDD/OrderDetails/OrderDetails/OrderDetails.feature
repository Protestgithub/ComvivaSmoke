Feature: User Management : Buissness


######################################### Sudheer ##################################################


    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_129
    # # #
@test

    Scenario: To verify that Admin user can view all the transaction details under Order details menu.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        Then Click on order details

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_130
    # # #
@test

    Scenario: To verify that Admin user can check all the Order Details of a customer/ business users successfully.
   	 Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile number and KYC number in search menu for customer/ business users
        And  Click on view Details
        Then Click on order details for customer/ business users


     # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_131
    # # #
@test

    Scenario: To verify that latest order transactions will be displayed on the first page of Order details screen.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        Then Click on order details for latest order transactions


    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_132
    # # #
@test

    Scenario: To verify that all the wallet transactions are displayed in statement screen sucessfully.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History
        And Click on expand button
        Then Click on wallet view Details
@test

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_133
    # # #
@test

    Scenario: To verify that user can able to view all the wallet transactions by entering valid transaction id.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History for valid transaction with id
        And Click on expand button on valid transaction with id
        Then Click on view Details for wallet transactions with id

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_134
    # # #
@test

    Scenario: To verify that user can able to fetch the Statement based on the transaction type (success, fail etc.)
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History for transaction type
        And Click on filter and Select status type and Select apply
        And Click on expand button for transaction type
        Then Click on view Details for transaction

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_135
    # # #
@test

    Scenario: To verify that user can able to fetch the Statement based on the Date range.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History based on the Date
        And Click on filter
        And Select start date and end date and  Click apply
        And Click on expand button based on the Date
        Then Click on view Details based on the Date range


