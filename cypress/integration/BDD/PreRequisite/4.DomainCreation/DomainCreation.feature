Feature: Domain Creation

##################################### Domain Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_08
# 
@prerequisite

Scenario:To verify that System admin should be able to add domain in the system.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Domain Management >> Add Domain
And Enter Domain Name and Domain Code.
Then Click on submit button.

##################################### Category Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_09
# 
@prerequisite

Scenario:To verify that System admin should be able to add Category in the system.
Given Login into Mobiquity Portal as System admin Maker
And Click Category Management.
Then Select Add Category.
And Enter Category Code and Category Name.
Then Select Domain and Parent Category.
And Click on Submit & confirm button.

