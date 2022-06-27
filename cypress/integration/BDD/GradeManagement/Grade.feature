Feature: Grade Management
    

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_13
# 
@test

Scenario:To verify that master can not modify the grade code only the name of the grade can be modified
Given Login into Mobiquity Portal as masteradmin Maker
When Click on User Profile Management >> Modify Grade
And Do required changes.
And Click on Modify.
And Click on confirm button.

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_177
# 
@test

Scenario:To verify that master can not modify the grade code only the name of the grade can be modified
Given Login into Mobiquity Portal as masteradmin Maker
When Click on User Profile Management >> Add Grade
And Select the domain & category for which grade needs to be added.
And logout the user
Given Login into Mobiquity Portal as masteradmin Maker
When Click on User Profile Management >> Delete Grade

