
# Github Issue Generator

## Install Hub https://github.com/github/hub and GHI https://github.com/stephencelis/ghi

'''bash
brew install hub
brew install ghi
ghi config --auth <username>
'''

## Lets Create Some Issues

'''bash

# LABELS

ghi label "GLOBAL"					-c "#0088cc"
ghi label "SIGNUP"					-c "#0088cc"
ghi label "SIGNIN"					-c "#0088cc"
ghi label "HOMEPAGE"					-c "#0088cc"
ghi label "DASHBOARD"				-c "#0088cc"
ghi label "ASSIGNED TESTS"			-c "#0088cc"
ghi label "GROUPED TESTS"			-c "#0088cc"
ghi label "TEST"						-c "#0088cc"
ghi label "QUESTION"					-c "#0088cc"
ghi label "PROJECT"					-c "#0088cc"
ghi label "TEAM"						-c "#0088cc"
ghi label "SETTINGS"					-c "#0088cc"
ghi label "USER ACCOUNT"			-c "#0088cc"

ghi label "Frontend"					-c "#A67968"
ghi label "Backend"					-c "#BFA393"

ghi label "Feature"					-c "#5BB13F"
ghi label "Primary Feature"		-c "#1C9944"

ghi label "Pre Demo Feature"		-c "#B335F7"
ghi label "Post Demo Feature"		-c "#691F91"

ghi label "Meeting"					-c "#F36B25"
ghi label "Blocked"					-c "#fe0139"

ghi label "To Do"						-c "#B2D249"
ghi label "In Progress"				-c "#77994C"
ghi label "Done"						-c "#3D6066"



# ISSUES
ghi open -m "SERVER COMPLETE"								-u "quitequinn"		-L "SERVER"			-L "Feature"		-L "Primary Feature"	 
ghi open -m "SERVER Staging Instance"					-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Staging Load Balancer"			-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Staging Domain"						-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Staging Storage"					-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Production Instance"				-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Production Load Balancer"		-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Production Domain"					-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Production Storage"				-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Staging ENV Variables"			-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Production ENV Variables"		-u "quitequinn"		-L "SERVER"			-L "Feature"
ghi open -m "SERVER Local ENV Variables"				-u "quitequinn"		-L "SERVER"			-L "Feature"

ghi open -m "GLOBAL COMPLETE"								-u "quitequinn"		-u "patrickaltair"	-L "GLOBAL"			-L "Feature"		-L "Primary Feature" 
ghi open -m "GLOBAL Notifications"						-u "quitequinn"		-u "patrickaltair"	-L "GLOBAL"			-L "Feature"		-L "Frontend"
ghi open -m "GLOBAL Footer"								-u "quitequinn"		-u "patrickaltair"	-L "GLOBAL"			-L "Feature"		-L "Frontend"
ghi open -m "GLOBAL Header pre login"					-u "quitequinn"		-u "patrickaltair"	-L "GLOBAL"			-L "Feature"		-L "Frontend"
ghi open -m "GLOBAL Header post login"					-u "quitequinn"		-u "patrickaltair"	-L "GLOBAL"			-L "Feature"		-L "Frontend"
ghi open -m "GLOBAL Logo"									-u "quitequinn"		-u "patrickaltair"	-L "GLOBAL"			-L "Feature"		-L "Frontend"

ghi open -m "SIGNUP COMPLETE"								-u "quitequinn"		-L "SIGNUP"				-L "Feature"		-L "Primary Feature"
ghi open -m "SIGNUP Frontend"								-u "quitequinn"		-L "SIGNUP"				-L "Feature"		-L "Frontend"
ghi open -m "SIGNUP Backend"								-u "quitequinn"		-L "SIGNUP"				-L "Feature"		-L "Backend"

ghi open -m "SIGNIN COMPLETE"								-u "quitequinn"		-L "SIGNIN"				-L "Feature"		-L "Primary Feature"	 
ghi open -m "SIGNIN Frontend"								-u "quitequinn"		-L "SIGNIN"				-L "Feature"		-L "Frontend"
ghi open -m "SIGNIN Backend"								-u "quitequinn"		-L "SIGNIN"				-L "Feature"		-L "Backend"

ghi open -m "HOMEPAGE COMPLETE"							-u "quitequinn"		-L "HOMEPAGE"			-L "Feature"		-L "Primary Feature" 
ghi open -m "HOMEPAGE Frontend"							-u "quitequinn"		-L "HOMEPAGE"			-L "Feature"		-L "Frontend"
ghi open -m "HOMEPAGE Backend"							-u "quitequinn"		-L "HOMEPAGE"			-L "Feature"		-L "Backend"

ghi open -m "DASHBOARD COMPLETE"							-u "quitequinn"		-L "DASHBOARD"			-L "Feature"		-L "Primary Feature" 
ghi open -m "DASHBOARD Condensed Assigned Tests"	-u "quitequinn"		-L "DASHBOARD"			-L "Feature"		-L "Frontend"
ghi open -m "DASHBOARD Condensed Created Tests"		-u "quitequinn"		-L "DASHBOARD"			-L "Feature"		-L "Frontend"
ghi open -m "DASHBOARD Create Project / Test"		-u "quitequinn"		-L "DASHBOARD"			-L "Feature"		-L "Frontend"

ghi open -m "ASSIGNED TESTS COMPLETE"					-u "quitequinn"		-L "ASSIGNED TESTS"	-L "Feature"		-L "Primary Feature" 
ghi open -m "ASSIGNED TESTS List"						-u "quitequinn"		-L "ASSIGNED TESTS"	-L "Feature"		-L "Frontend"
ghi open -m "ASSIGNED TESTS Archived"					-u "quitequinn"		-L "ASSIGNED TESTS"	-L "Feature"		-L "Frontend"
ghi open -m "ASSIGNED TESTS Backend"					-u "quitequinn"		-L "ASSIGNED TESTS"	-L "Feature"		-L "Backend"

ghi open -m "GROUPED TESTS COMPLETE"					-u "quitequinn"		-L "GROUPED TESTS"	-L "Feature"		-L "Primary Feature" 
ghi open -m "GROUPED TESTS List"							-u "quitequinn"		-L "GROUPED TESTS"	-L "Feature"		-L "Frontend"
ghi open -m "GROUPED TESTS Create"						-u "quitequinn"		-L "GROUPED TESTS"	-L "Feature"		-L "Frontend"
ghi open -m "GROUPED TESTS Archived"					-u "quitequinn"		-L "GROUPED TESTS"	-L "Feature"		-L "Frontend"
ghi open -m "GROUPED TESTS Backend"						-u "quitequinn"		-L "GROUPED TESTS"	-L "Feature"		-L "Backend"

ghi open -m "TEST COMPLETE"								-u "quitequinn"		-L "TEST"				-L "Feature"		-L "Primary Feature" 
ghi open -m "TEST Creation"								-u "quitequinn"		-L "TEST"				-L "Feature"		-L "Frontend"
ghi open -m "TEST Overview"								-u "quitequinn"		-L "TEST"				-L "Feature"		-L "Frontend"
ghi open -m "TEST Backend Model"							-u "quitequinn"		-L "TEST"				-L "Feature"		-L "Backend"
ghi open -m "TEST Backend API"							-u "quitequinn"		-L "TEST"				-L "Feature"		-L "Backend"

ghi open -m "QUESTION COMPLETE"							-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Primary Feature" 
ghi open -m "QUESTION Creation"							-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Creation HTML Visual"			-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Creation Image Visual"			-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Creation Import Visual"		-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Creation Reference Images"	-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Creation List"					-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Creation Backend"				-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Backend"
ghi open -m "QUESTION Answer"								-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Answer List"						-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Answer Reference Images"		-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Answer Visual"					-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Frontend"
ghi open -m "QUESTION Answer Backend"					-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Backend"
ghi open -m "QUESTION Backend Model"					-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Backend"
ghi open -m "QUESTION Backend API"						-u "quitequinn"		-L "QUESTION"			-L "Feature"		-L "Backend"

ghi open -m "PROJECT COMPLETE"							-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Primary Feature" 
ghi open -m "PROJECT Overview Modal"					-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT List"									-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Create"								-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Archived"							-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Metadata"							-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Team"									-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Tests"								-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Font Entry"							-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Group Management"					-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Frontend"
ghi open -m "PROJECT Backend Model"						-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Backend"
ghi open -m "PROJECT Backend API"						-u "quitequinn"		-L "PROJECT"			-L "Feature"		-L "Backend"

ghi open -m "TEAM COMPLETE"								-u "quitequinn"		-L "TEAM"				-L "Feature"		-L "Primary Feature"
ghi open -m "TEAM Frontend"								-u "quitequinn"		-L "TEAM"				-L "Feature"		-L "Frontend"
ghi open -m "TEAM Backend Model"							-u "quitequinn"		-L "TEAM"				-L "Feature"		-L "Backend"
ghi open -m "TEAM Backend API"							-u "quitequinn"		-L "TEAM"				-L "Feature"		-L "Backend"

ghi open -m "SETTINGS COMPLETE"							-u "quitequinn"		-L "SETTINGS"			-L "Feature"		-L "Primary Feature"
ghi open -m "SETTINGS Frontend"							-u "quitequinn"		-L "SETTINGS"			-L "Feature"		-L "Frontend"
ghi open -m "SETTINGS Backend"							-u "quitequinn"		-L "SETTINGS"			-L "Feature"		-L "Backend"

ghi open -m "USER ACCOUNT COMPLETE"						-u "quitequinn"		-L "USER ACCOUNT"		-L "Feature"		-L "Primary Feature"
ghi open -m "USER ACCOUNT Backend Model"				-u "quitequinn"		-L "USER ACCOUNT"		-L "Feature"		-L "Backend"
ghi open -m "USER ACCOUNT Backend API"					-u "quitequinn"		-L "USER ACCOUNT"		-L "Feature"		-L "Backend"

'''
