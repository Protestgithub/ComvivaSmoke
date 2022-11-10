Feature: Registering Churned Subscriber


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
    
Scenario:To verify that user should not be able to view wallet in manage users after churning that user
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in Search
Then User Click on Delete button and Verify wallet details are not available
