# Team Member Management Feature

A comprehensive team collaboration feature for your ToDo application, similar to Jira's team management functionality.

## 🚀 Features Implemented

### Backend Features
- **Team Model**: Complete team management with roles (Owner, Admin, Member, Viewer)
- **User Model**: Updated to support team relationships and preferences
- **Member Management**: Add, remove, update member roles
- **Invitation System**: Invite members by email with pending invites
- **Role-based Access Control**: Proper permissions for team operations
- **Team Statistics**: Track team performance and member count

### Frontend Features
- **Team Management Interface**: Create and manage teams
- **Member Management**: Add, remove, and update member roles
- **Invitation Modal**: Send invites to new members
- **Role Dropdown**: Visual role selection component
- **Team Selector**: Choose between different teams
- **Modern UI**: Clean, responsive design with TailwindCSS

## 📁 File Structure

### Backend Files
```
todo-backend/
├── src/
│   ├── models/
│   │   ├── team.model.js          # Team schema with members array
│   │   └── user.model.js          # Updated user schema
│   ├── controllers/
│   │   └── team.controller.js     # Team management logic
│   ├── routes/
│   │   └── team.routes.js         # Team API routes
│   └── middleware/
│       └── auth.middleware.js     # Authentication middleware
└── server.js                      # Updated to include team routes
```

### Frontend Files
```
todo-frontend/
├── src/
│   ├── components/
│   │   ├── TeamManagement.jsx     # Main team management interface
│   │   ├── InviteMemberModal.jsx  # Modal for inviting members
│   │   ├── RoleDropdown.jsx       # Role selection component
│   │   ├── TeamSelector.jsx       # Team selection interface
│   │   └── TopBar.jsx             # Updated with team button
│   ├── api.js                     # Updated with team API functions
│   └── App.js                     # Updated with team state management
```

## 🔧 API Endpoints

### Team Management
- `POST /api/teams` - Create a new team
- `GET /api/teams` - Get user's teams
- `GET /api/teams/:teamId` - Get team by ID
- `PUT /api/teams/:teamId` - Update team
- `DELETE /api/teams/:teamId` - Delete team

### Member Management
- `GET /api/teams/:teamId/members` - Get team members
- `POST /api/teams/:teamId/invite` - Invite member by email
- `PUT /api/teams/:teamId/members/:memberId/role` - Update member role
- `DELETE /api/teams/:teamId/members/:memberId` - Remove member

## 📝 Example Axios Calls

### Create Team
```javascript
const createTeam = async (teamData) => {
  try {
    const response = await axios.post('/api/teams', teamData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

// Usage
const newTeam = await createTeam({
  name: 'Development Team',
  description: 'Our main development team'
});
```

### Invite Member
```javascript
const inviteMember = async (teamId, memberData) => {
  try {
    const response = await axios.post(`/api/teams/${teamId}/invite`, memberData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error inviting member:', error);
    throw error;
  }
};

// Usage
const invite = await inviteMember('team123', {
  email: 'newmember@example.com',
  role: 'Member'
});
```

### Update Member Role
```javascript
const updateMemberRole = async (teamId, memberId, role) => {
  try {
    const response = await axios.put(`/api/teams/${teamId}/members/${memberId}/role`, 
      { role }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating member role:', error);
    throw error;
  }
};

// Usage
const updated = await updateMemberRole('team123', 'member456', 'Admin');
```

### Get Team Members
```javascript
const getTeamMembers = async (teamId) => {
  try {
    const response = await axios.get(`/api/teams/${teamId}/members`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Usage
const members = await getTeamMembers('team123');
console.log(members.data.members); // Array of team members
console.log(members.data.owner);   // Team owner
console.log(members.data.pendingInvites); // Pending invitations
```

### Remove Member
```javascript
const removeMember = async (teamId, memberId) => {
  try {
    const response = await axios.delete(`/api/teams/${teamId}/members/${memberId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing member:', error);
    throw error;
  }
};

// Usage
const result = await removeMember('team123', 'member456');
```

## 🎯 Usage Instructions

### 1. Start the Backend
```bash
cd todo-backend
npm start
```

### 2. Start the Frontend
```bash
cd todo-frontend
npm start
```

### 3. Using the Team Management Feature

1. **Access Team Management**: Click the "Teams" button in the top navigation bar
2. **Create a Team**: Click "Create New Team" and fill in the team details
3. **Select a Team**: Choose a team from the list to manage its members
4. **Invite Members**: Click "Invite Member" to add new team members
5. **Manage Roles**: Use the role dropdown to change member permissions
6. **Remove Members**: Click the trash icon to remove team members

## 🔐 Role Permissions

### Owner
- Full team control
- Can delete the team
- Can manage all members
- Cannot be removed

### Admin
- Can invite new members
- Can update member roles
- Can remove members (except owner)
- Can update team settings

### Member
- Can view team tasks
- Can create and edit tasks
- Cannot manage team members

### Viewer
- Can only view team tasks
- Cannot create or edit tasks
- Cannot manage team members

## 🎨 UI Components

### TeamManagement.jsx
- Displays all team members in a clean table format
- Shows member roles with color-coded badges
- Provides action buttons for role updates and member removal
- Includes pending invites section

### InviteMemberModal.jsx
- Email input with validation
- Role selection dropdown
- Loading states and error handling
- Clean, accessible modal design

### RoleDropdown.jsx
- Reusable role selection component
- Color-coded role indicators
- Smooth animations and transitions
- Disabled state support

### TeamSelector.jsx
- Team selection interface
- Create new team functionality
- Team statistics display
- Responsive design

## 🚀 Getting Started

1. **Install Dependencies**: Make sure all npm packages are installed
2. **Database Setup**: Ensure MongoDB is running and connected
3. **Environment Variables**: Set up your JWT secret and database URL
4. **Start Services**: Run both backend and frontend servers
5. **Test Features**: Create a team and invite members to test the functionality

## 🔧 Customization

The components are built with TailwindCSS and are fully customizable:
- Modify colors in the role color functions
- Update styling in component className props
- Add new roles by updating the role arrays
- Extend functionality by adding new API endpoints

## 📱 Responsive Design

All components are fully responsive and work on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes

The UI adapts gracefully to different viewport sizes with appropriate breakpoints and responsive classes.

## 🎉 Ready to Use!

Your team management feature is now fully implemented and ready for production use. The system provides a complete team collaboration experience similar to Jira, with proper role-based access control, member management, and a modern, intuitive interface.



