import React from 'react';
import UserForm from './UserForm';
import ProfileForm from './ProfileForm';

const App: React.FC = () => {
  return (
      <div>
          {/*<UserForm />*/}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <ProfileForm firstName="John" lastName="Doe" address="123 Main St" iban="DE44 1234 5678 9123 4567 89" email="john.doe@example.com" phone="+1234567890" />
          </div>
      </div>
  );
};

export default App;
