Feature: Category creation

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


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_10
# 
@prerequisite

Scenario:To verify that only System admin will be able to approve/reject the initiated category.
Given Login into Mobiquity Portal as System admin Checker1
And Click Add category approval.
Then Select Category approval.
Then Select the category that needs to be approved
