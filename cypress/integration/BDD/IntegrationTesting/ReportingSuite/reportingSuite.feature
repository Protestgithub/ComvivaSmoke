Feature: Repoting Suite 

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_101 & TC_188 & TC_189
# 

@test

Scenario:To verify that the Pentaho User should be able to open and download User Registration Details Report.
Given Login into Mobiquity Portal as System admin User and Launch Pentaho Portal
And click on Browse Files
And Click on bd-demo-reports 
And open Customer Registration Report
And Select the format and click on View Report and User should be able to Dowload that Files

# Scenario_ID : TC_190
And Download Customer Banking Activation Report
# Scenario_ID : TC_191
And Download Customer Blocked Access Report
# Scenario_ID : TC_192
And Download Deleted Users Report
# Scenario_ID : TC_193
And Download Suspend Customers Report
# Scenario_ID : TC_195
And Download Commoission Report
# Scenario_ID : TC_196
And Download Reimbursment Report
# Scenario_ID : TC_197
And Download Service Charge Report
# Scenario_ID : TC_200
And Download Stock Management Report
# Scenario_ID : TC_199
And Download User Transaction Report
