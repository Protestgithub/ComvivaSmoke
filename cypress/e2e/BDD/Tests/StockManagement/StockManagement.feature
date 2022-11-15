Feature: Stock Management

    This feature includes Stock initiation,StockApproval1 and StockApproval2 by System Admin

########################################### Stock Management ####################################################
 #####            Sudheer                  #####





   # # # Author: Sudheer Baraker
    # # # Last Updated: 13/10/2022
    # # # Comments :
    # # # Scenario_ID : TC_06
    # # #
@test
    
    Scenario: To verify that System admin is able to Initiate Stock Transfer to EA through web.



       Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Stock Management and Stock Transfer to EA
        And User Select MFS Provider
        And User Should Enter Reference number
        And User Should Enter Amount
        And User Click on Submit button
        Then  User Click on Confirm button



   # # # Author: Sudheer Baraker
    # # # Last Updated: 13/10/2022
    # # # Comments :
    # # # Scenario_ID : TC_07
    # # #
@test



   Scenario: To Verify that Once initiated the stock,the user will be able to go for first level approved from Stock Transfer to EA Approval – 1.



       Given Login into Mobiquity Portal as System admin Checker1
        When Click on Stock Management
        And Click on Stock Transfer to EA Approval 1
      #  And Select the Initiated stock for which level 1 Approval is required
        And Click on Submit
        Then Click on Approve



         # # # Author: Sudheer Baraker
    # # # Last Updated: 13/10/2022
    # # # Comments :
    # # # Scenario_ID : TC_08
    # # #
@test



   Scenario: To Verify that, If Stock transfer amount is higher than the set Stock Transfer limit to EA then, the system will request for second level approval from Stock Transfer to EA Approval – 2



       Given Login into Mobiquity Portal as System admin Checker2
        When Click on Stock Management
        And Click on Stock Transfer to EA Approval 2
      #  And Select the Initiated stock for which level 1 Approval is required
        And Click on Submit Approval2
        Then Click on Approve of Approval2


 # # # Author: Sudheer Baraker
    # # # Last Updated: 13/10/2022
    # # # Comments :
    # # # Scenario_ID : TC_37
    # # #
@test

    Scenario: To verify that the System admin is able to initiate the reimbursement through web
Given Login into Mobiquity Portal as System admin Maker
        When Click on Stock Management and Reimbursement
        And Select User type
        And Enter MSISDN,Provider,Wallet Type,Reference Number and Remarks
        And Click on reimbursement submit
        Then Enter amount and click on confirm

