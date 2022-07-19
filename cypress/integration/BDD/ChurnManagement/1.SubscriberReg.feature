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
        Then Logout
    #Approval
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on submitted user data
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
        And Enter all the required subscriber details for bulk payout
        Then SubscrigReg Confirmation message is displayed
        Then Logout
    #Approval
        Given Login into Mobiquity Portal as another System admin Checker1 after logout
        When Navigate to Approvals and filter by Submitted status
        And User click on submitted user data
        And Approve the Users
        Then Added User status is approved
