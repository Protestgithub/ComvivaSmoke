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
        And Enter all the required subscriber details for churn intiation
        Then SubscrigReg Confirmation message is displayed
        When Navigate to My Activity and Aplly required filters
        Then Assert Created Churn Subscriber Mobile Number and Write Created on time
        Then Logout

   #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation for churn
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on Subscriber submitted user data
        And Approve the Users
        Then Added User status is approved


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
        Then Logout

    #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation for churn bulk
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on Churn Subscriber submitted user data
        And Approve the Users
        Then Added User status is approved


      