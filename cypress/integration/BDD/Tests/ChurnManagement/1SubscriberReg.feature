 Feature:Subscriber Registration for churn
 
 # # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    @test

    Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details
        Then SubscrigReg Confirmation message is displayed
        When Navigate to My Activity and Aplly required filters
        Then Assert Created Subscriber Mobile Number and Write Created on time

   #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation for churn
        Given Login into Mobiquity Portal as System admin Checker1
        When Navigate to Approvals and filter by Submitted status
        And User click on Subscriber submitted user data
        And Approve the Users
        Then Added User status is approved


########################### Cashin ########################

 # # # Author:Narendra
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    @test

Scenario: To verify that Business admin is able to Perform Cash in for Subscriber
Given Login into Mobiquity Portal as Business admin User3
When Navigate to Cash in or Cash out and Click on Cash in
And Enter all Mandatory details
Then Click on Submit and Click on Confirm Button

 # # # Author:Narendra
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    @test

Scenario: To verify that Business admin is able to Perform Cash in for Subscriber
Given Login into Mobiquity Portal as Business admin User4
When Navigate to Cash in or Cash out and Click on Cash in
And Enter all Mandatory details
Then Click on Submit and Click on Confirm Button1

 # # # Author:Narendra
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    @test
    
Scenario: To verify that Business admin is able to Perform Cash in for Subscriber
Given Login into Mobiquity Portal as Business admin User4
When Navigate to Cash in or Cash out and Click on Cash in
And Enter all Mandatory details
Then Click on Submit and Click on Confirm Button2



# # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    @test

    Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation for bulk
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details for bulk upload
        Then SubscrigReg Confirmation message is displayed
        When Navigate to My Activity and Aplly required filters
        Then Assert Created Subscriber Mobile Number for Bulk and Write Created on time

    #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation for churn bulk
        Given Login into Mobiquity Portal as System admin Checker1
        When Navigate to Approvals and filter by Submitted status
        And User click on Subscriber submitted user data
        And Approve the Users
        Then Added User status is approved