Feature: Stock Management

    This feature includes Stock initiation,StockApproval1 and StockApproval2 by System Admin

########################################### Stock Management ####################################################

# Author: Narendra
# Last Updated: 5/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_75
@test

Scenario: To verify that System admin can initiate the stock successfully
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then click on Submit and Confirm button

# Author: Narendra
# Last Updated: 5/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_76
@test

Scenario: To verify that System admin can successfully approve the stock at level>>1 
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Stock Management and Click on Stock Approval 1
And Click on Submit Button
Then Click on Approve button

# Author: Narendra
# Last Updated: 6/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_77
@test

Scenario: To verify that System admin can successfully approve the stock at level 2.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter reference number and amount
Then click on Submit and Confirm button
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Stock Management and Click on Stock Approval 1
And Click on Submit Button
Then Click on Approve button
Then Logout
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Stock Management and Click on Stock Approval 2
Then Click on Submit and Approve the Stock at level 2


    #####            Sudheer                  #####

    # # # Author: Sudheer Baraker
    # # # Last Updated: 05/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_78
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
    # # # Last Updated: 05/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_78
    # # #
@test

    Scenario: To verify that System admin is able to Initiate Stock Transfer to RA through web.
Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Stock Management and Stock Transfer to RA
        And Select MFS Provider
        And Enter Reference number
        And Enter Amount
        And Click on Submit button
        Then Click on Confirm button

    # # # Author: Sudheer Baraker
    # # # Last Updated: 06/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_79
    # # #
@test

    Scenario: To verify that System admin can enquire the Stocks through stock enquiry.
Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Stock Management and Stock Enquiry
        #     And User Select the From & To Dates and Transaction Status
        #     And Click on Submit or
        And Select any Transaction ID from the displayed list
        Then Click on Enquiry Submit button


   