Feature:Subscriber Registration for churn


  # # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn
    # # # Scenario_ID :Pre Requisit
    @test

    Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation for churn approve or reject
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details for churn approve or reject
        Then SubscrigReg Confirmation message is displayed
        When Navigate to My Activity and Aplly required filters
        Then Assert Created Subscriber Mobile Number for ApprRej and Write Created on time
        Then Logout

 #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation 
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on Subscriber submitted user data
        And Approve the Users
        Then Added User status is approved

         # # # Author:Chetan.S
    # # # Last Updated:
    # # # Comments :Subscriber Creation to Churn for Batch/Reject
    # # # Scenario_ID :Pre Requisit
    @test

    Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation for Batch Reject
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details for Batch Reject
        Then SubscrigReg Confirmation message is displayed
        When Navigate to My Activity and Aplly required filters
        Then Assert Created Subscriber Mobile Number for Batch Reject and Write Created on time
        Then Logout
        
   #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation for Batch
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on Subscriber submitted user data
        And Approve the Users
        Then Added User status is approved
