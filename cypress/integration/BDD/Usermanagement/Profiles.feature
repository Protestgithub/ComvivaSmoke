Feature: User Management :Profiles

    This feature includes Modifying of Profiles by System Admin

######################################### Monica ########################################################


# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_144
# 


Scenario:To verify that system admin user can view the list of profiles
Given Login into Mobiquity Portal as System admin Maker
When Navigate to UserManagement And Click on Regulatory Profile

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_145
# 


Scenario:To verify that system admin user can modify the name of the regulatory profile only.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to UserManagement And Click on Regulatory Profile
And Under Actions tab click on Modify Regulatory Profile icon and Enter Profile Name
Then Click On Save Modified Regulatory Profile

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_146
# 


Scenario:To verify that system admin user can to search the regulatory profile by using the profile code or profile name.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to UserManagement And Click on Regulatory Profile
Then Enter detail to seach in textbox and click search



# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_147
# 


Scenario:To verify that That system admin user will be able to search the marketing profile
Given Login into Mobiquity Portal as System admin Maker
When Navigate to UserManagement And Click on Marketing Profile
And Enter detail to search in textbox and click search



