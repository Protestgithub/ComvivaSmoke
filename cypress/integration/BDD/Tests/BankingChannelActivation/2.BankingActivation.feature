Feature: BankingActivation

    This feature includes Banking Activation of Subscribers

    # Author: CHetan S
    # Last Updated:21/06/2022
    # Comments
    # Scenario_ID :
    # TestCase_ID : TC_155


    Scenario: To verify that System Admin is able to activate mobile banking if CIF number exist.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Banking Channel Activation and click
        And Enter the CIF number and search for the user
        And Click on Mobile Banking Activation
        Then Confirm and Verify the Mob Banking Activtion Message sent to user


    # Author: CHetan S
    # Last Updated:21/06/2022
    # Comments
    # Scenario_ID :
    # TestCase_ID : TC_156


    Scenario: To verify that System Admin is able to activate Internet banking if CIF number exist.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Banking Channel Activation and click
        And Enter the CIF number and search for the user
        And Click on Internet Banking Activation
        Then Confirm and Verify the Internet Banking Activtion Message sent to user

    # Author: CHetan S
    # Last Updated:21/06/2022
    # Comments
    # Scenario_ID :
    # TestCase_ID : TC_157


    Scenario: To verify that System Admin is able to verify admin is able to see the Activated Message.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Banking Channel Activation and click
        And Enter the Activated CIF number and search for the user
        Then verify admin is able to see the Activated Message

    # Author: CHetan S
    # Last Updated:21/06/2022
    # Comments
    # Scenario_ID :
    # TestCase_ID : TC_158


    Scenario: To verify that System Admin is able to activate mobile banking using MSISDN if CIF number does not exist.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Banking Channel Activation and click
        And Enter the Full KYC mobile number and search for the user
        And Click on next and activate mobile Banking
       # Then Confirm and Verify the Mob Banking Activtion Message sent to user

    # Author: CHetan S
    # Last Updated:21/06/2022
    # Comments
    # Scenario_ID :
    # TestCase_ID : TC_159


 Scenario: To verify that System Admin is able to activate mobile banking using MSISDN if CIF number does not exist.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Banking Channel Activation and click
        And Enter the Full KYC mobile number and search for the user
        And Click on next and activate internet Banking
     #   Then Confirm and Verify the Mob Banking Activtion Message sent to user

    # Author: CHetan S
    # Last Updated:21/06/2022
    # Comments
    # Scenario_ID :
    # TestCase_ID : TC_160


        Scenario: To verify that message should be displayed to bank admin if mobile number/user does not exist then process should terminated.
        Given Login into Mobiquity Portal as System admin Maker
        When Navigate to Banking Channel Activation and click
        And Enter the mobile or CIF number which is not registered and search for the user
        Then verify admin is able to see the Message mobile or CIF number does not exist in the system
