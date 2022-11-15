Feature:Subscriber

 # # # Author:Chetan.S
  # # # Last Updated:20-10-22
  # # # Comments :Subscriber Creation to Churn Smoke Test
  # # # Scenario_ID :Pre Requisite

  Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to User Management and Click on register
        And Select User type as Subscriber and click on Subscriber
        And Enter all the required subscriber details for churn
        Then SubscrigReg Confirmation message is displayed
        When Navigate to My Activity and Aplly required filters
        Then Assert Created Subscriber churn Mobile Number and Write Created on time for churn
        Then Logout

   #Approval
        Scenario:To verify that valid SystemAdmin/businsess User is able to approve  Subscriber creation for churn
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on Subscriber submitted user data for churn
        And Approve the Users
        Then Added User status is approved

# # # Author:Chetan.S
# # # Last Updated:
# # # Comments :Subscriber Creation to Churn bulk
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
        And User click on Subscriber submitted user data for churn
        And Approve the Users
        Then Added User status is approved