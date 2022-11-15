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
Then Click on submit button in domain.



##################################### Category Creation ################################################




# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_09
#
@prerequisite



Scenario:To verify that System admin should be able to add Category in the system.
Given Login into Mobiquity Portal as System admin Maker
When Click Category Management.
And Select Add Category.
And Enter Category Code and Category Name.
And Select Domain and Parent Category.
Then Click on Submit & confirm button.


# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_10
#
@prerequisite

Scenario:To verify that only System admin will be able to approve/reject the initiated category.
Given Login into Mobiquity Portal as System admin Checker1
When Click Add category approval.
And Select Category approval.
Then Select the category that needs to be approved



##################################### Grade Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_12
# 
@prerequisite

Scenario:To verify that Master user can create grade, if all fields in contains value upto their maximum length.
Given Login into Mobiquity Portal as masteradmin Maker
When Click on User Profile Management >> Add Grade
And Select the domain & category for which grade needs to be added.


# Author: Narendra
# Last Updated:
# Comments 
# Test Case_ID : 
# 
@prerequisite

Scenario:To verify that System admin should be able to add domain in the system for Business Admin
Given Login into Mobiquity Portal as System admin Maker
When User Click on Domain Management >> Add Domain
And Enter Domain Name and Domain Code for BA
Then Click on submit button for BA

# Author: Narendra
# Last Updated:
# Comments 
# Test Case_ID : 
# 
@prerequisite

Scenario:To verify that Business admin should be able to add Category in the system.
Given Login into Mobiquity Portal as Business admin Maker
When Click Category Management in BA
And Select Add Category.
And Enter Category Code and Category Name for BA
And Select Domain and Parent Category for BA
Then Click on Submit & confirm button.


# Author: Narendra
# Last Updated:
# Comments 
# Test Case_ID : 
# 
@prerequisite

Scenario:To verify that only System admin will be able to approve/reject the initiated category By Business Admin
Given Login into Mobiquity Portal as System admin Checker1
When Click Add category approval.
And Select Category approval for BA
Then Select the category that needs to be approved


