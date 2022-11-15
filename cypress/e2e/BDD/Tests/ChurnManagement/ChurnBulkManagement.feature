Feature:Churn Bulk

# # # Author:Chetan.S
    # # # Last Updated:20-10-2022
    # # # Comments : Churn Bulk Upload Smoke Test
    # # # Scenario_ID :TC_64
@test

    Scenario: To verify that the System admin can initiate and approve the initiated churn process with Bulk Upload and Approve
         Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data for bulkupload
        And convert json to csv
        And Upload csv file with valid details
        And Click on Churn Management and Churn Approval
        Then Select the initiated churn request and click on Batch Reject 
    


