Feature: Churn Initiation


# # Author:Chetan.S
    # # Last Updated:11-06-2022
    # # Comments :
    # # Scenario_ID :TC_102
@test
  
    Scenario: To verify that the System admin can initiated churn process and approve.
        Given Login into Mobiquity Portal as System admin Checker1
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data
        And convert json to csv
        And Upload csv file with valid details
        And Click on Churn Management and Churn Approval
        And Select the initiated churn request and click on Batch Approve 
        Then Confirm the initiated churn request



        # # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :
    # # # Scenario_ID :TC_104
@test
    
    Scenario:To verify that valid SystemAdmin is able to initiate Subscriber creation using Churned MSISDN.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details using Churned MSISDN
        Then SubscrigReg Confirmation message is displayed
        Then Save the Registered MSISDN in to fixture
        Then Logout
    #Approval
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on submitted user data
        And Approve the Users
        Then Added User status is approved
        Then Save the Registered MSISDN in to fixture