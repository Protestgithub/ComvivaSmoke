Feature: Churn Management

    # # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    
    Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details
        Then SubscrigReg Confirmation message is displayed
        Then Logout
    #Approval
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on submitted user data
        And Approve the Users
        Then Added User status is approved

    # # # Author:Chetan.S
    # # # Last Updated:11-06-2022
    # # # Comments :
    # # # Scenario_ID :TC_102
  
    Scenario: To verify that the System admin can initiated churn process and approve.
        Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data
        And convert json to csv
        And Upload csv file with valid details
        Then Logout
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Click on Churn Management and Churn Approval
        Then  Select the initiated churn request and Then click on Batch Reject


    # # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :
    # # # Scenario_ID :TC_104
    
    Scenario:To verify that valid SystemAdmin is able to initiate Subscriber creation using Churned MSISDN.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details using Churned MSISDN
        Then SubscrigReg Confirmation message is displayed
        Then Logout
    #Approval
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on submitted user data
        And Approve the Users
        Then Added User status is approved
        Then Save the Registered MSISDN in to fixture


    # # # Author:Chetan.S
    # # # Last Updated:11-06-2022
    # # # Comments : Bulk Upload
    # # # Scenario_ID :TC_105
    Scenario: To verify that the System admin can approve the initiated churn process with Bulk Upload and Approve
        Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template
        And Upload Bulk csv file with valid details
        Then Logout
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Click on Churn Management and Churn Approval
        And Click on Churn Management > Churn Approval
        Then  Select the initiated churn request and Then click on Approve/Reject by Selection

    # # # Author: Sudheer Baraker
    # # # Last Updated: 19/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_107
    # # #
    Scenario: To verify that the System admin can approve the initiated churn process as Batch Reject
        Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data
        And convert json to csv
        And Upload csv file with valid details
        Then Logout
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Click on Churn Management and Churn Approval
        Then Select the initiated churn request and Then click on Batch Reject
    # # # Author: Sudheer Baraker
    # # # Last Updated: 19/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_108
    # # #
    Scenario: To verify that the System admin can approve the initiated churn process as Approve/Reject by Selection
        Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data
        And convert json to csv
        And Upload csv file with valid details
        Then Logout
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Click on Churn Management and Churn Approval
        Then Select the initiated churn request and Then click on Approve and Reject by Selection






        