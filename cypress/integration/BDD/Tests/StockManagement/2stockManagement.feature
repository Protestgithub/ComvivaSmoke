Feature: Stock Management stock Transfer to EA

    This feature includes Stock initiation,StockApproval1 and StockApproval2 by System Admin
 
 # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_80
    # # #
@test

    Scenario: To verify that System admin can enquire the details of stock Transfer to EA
Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Stock Management and Stock Transfer EA Enquiry
        And Select the From & To Dates and Transaction Status
        And Click on Submit
        And Select any Transaction ID from displayed list
        Then Click on View Submit button

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_81
    # # #
@test

    Scenario: To verify that the System admin is able to initiate the reimbursement through web
Given Login into Mobiquity Portal as System admin Maker
        When Click on Stock Management and Reimbursement
        And Select User type
        And Enter MSISDN,Provider,Wallet Type,Reference Number and Remarks
        And Click on reimbursement submit
        Then Enter amount and click on confirm

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_82
    # # #
@test

    Scenario: To verify that System admin can approve any stock reimbursement initiation request
Given Login into Mobiquity Portal as System admin Checker1
        When  Click on Stock management and stock reimbursement approval
        And  Select the initiated stock reimbursement request
        # And   Click on approve submit
        # Then click on approve button



    ############## Error Messages########################

    # # # Author: Sudheer Baraker
    # # # Last Updated: 05/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_171
    # # #
@test

    Scenario: To verify that proper error message should be displayed when no stock is present in wallet
Given Login into Mobiquity Portal as System admin Checker1
        When Navigate to Stock Management and Stock Withdrawal
        And User Select Stock Withdraw Wallet Type
        #  And User Select MFS Provider
        And User Should select Stock Withdraw Bank
        And User Should Enter Stock Withdraw Bank Account Number
        And User Should Enter Stock Withdraw Amount
        Then User Click on Stock Withdraw Submit button
    # Then  User Click on Confirm button

    # # # Author: Sudheer Baraker
    # # # Last Updated: 05/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_172
    # # #
@test

    Scenario: To verify that proper error message should be displayed when amount field contains any invalid character
Given Login into Mobiquity Portal as System admin Checker1
        When Navigate to Stock Management and Stock Withdrawal
        And User Select Stock Withdraw Wallet Type
        #  And User Select MFS Provider
        And User Should select Stock Withdraw Bank
        And User Should Enter Stock Withdraw Bank Account Number
        And User Should Enter Stock Withdraw invalid Amount
        Then User Click on Stock Withdraw invalid Amount Submit button
    #Then  User Click on Confirm button

    # # # Author: Sudheer Baraker
    # # # Last Updated: 05/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_173
    # # #
@test
    
    Scenario: To verify that proper error message should be displayed when amount field contains any invalid characte
Given Login into Mobiquity Portal as System admin Checker1
        When Navigate to Stock Management and Stock Initiation
        # And User Select MFS Provider
        And User Should Enter Stock Initiation Reference number
        And User Should Enter Stock Initiation Amount
        Then User Click on Stock Initiation Submit button
# Then  User Click on Confirm button