Feature: Churn Management

  
    # # # Author:Chetan.S
    # # # Last Updated:11-06-2022
    # # # Comments : Bulk Upload
    # # # Scenario_ID :TC_105
@test

    Scenario: To verify that the System admin can approve the initiated churn process with Bulk Upload and Approve
         Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data for bulkupload
        And convert json to csv
        And Upload csv file with valid details
        And Click on Churn Management and Churn Approval
        And Select the initiated churn request and click on Batch Reject 

    # # # Author: Sudheer Baraker
    # # # Last Updated: 19/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_107
    # # #
@test

    Scenario: To verify that the System admin can approve the initiated churn process as Batch Reject
        Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data batch reject
       And convert json to csv
      And Upload csv file with valid details
      And Click on Churn Management and Churn Approval
      And Select the initiated churn request and click on Batch Reject
        
    # # # Author: Sudheer Baraker
    # # # Last Updated: 19/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_108
    # # #
@test

    Scenario: To verify that the System admin can approve the initiated churn process as Approve/Reject by Selection
        Given Login into Mobiquity Portal as System admin Maker
        When  Click on Churn Management and Churn Initiation
        And  Download a File template 
        And Convert csv To JSON file
        And update the json data for Approve and Reject
        And convert json to csv
        And Upload csv file with valid details
        And Click on Churn Management and Churn Approval
        Then Select the initiated churn request and click on Approve and Reject by Selection
       
 






        