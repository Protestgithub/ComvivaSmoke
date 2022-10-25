Feature: Authorization Profile Creation

    #######################   Authorization Profile Creation ##########################

    Scenario: To verify that system admin should be able to add authorization profile
        ### Subscriber M1S1 ###
        Given Login into Mobiquity Portal as System admin Maker
          When  Select Authorization profile and add profile
          And  select Subscriber user type and select user role
          Then Fill all Details and Create Subscriber authorization profile
          When Navigate to My Activity for Subscriber authorization profile and Aplly required filters
          Then View Subscriber authorization profile and Write Created on time

    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_149
    # # #
        Scenario: Approval of added profile
          Given Login into Mobiquity Portal as another System admin Checker1 after logout
          Then User approval for Authorization profile

