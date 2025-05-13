# HopesAlive - Tech for Compassionate Rescue


### Problem Statement
Every day, countless animals suffer from injuries or accidents, yet many go unnoticed or remain unassisted due to fragmented reporting methods. Traditional systems are limited and lack collaboration among citizens, veterinary professionals, and animal shelters. There is an urgent need for a platform that facilitates efficient reporting of incidents while enabling professionals to respond promptly and effectively.

### What is HopesAlive?
HopesAlive is a dedicated web platform that enables users to report animal-related incidents by submitting details like photos and location. Upon submission, the platform ensures that relevant NGOs and volunteers in the area are promptly notified, allowing for quick action. Volunteers and NGOs can collaborate on the incident, track its progress, and communicate seamlessly to ensure swift rescue efforts.

### How We Solve the Problem
When an animal-related incident occurs in a city, users can easily report it on the website by submitting key details such as a photo and the location of the incident. Once the report is submitted, the system ensures that the city's dashboard is updated, making the incident visible for review. Volunteers and NGOs in the area can quickly access the incident details and take action to provide assistance.

Once an NGO views an incident on their dashboard, they can take immediate action. The platform allows them to assign volunteers, initiate rescue operations, and coordinate resources to ensure the animal receives prompt care. By streamlining communication between the reporting users, NGOs, and volunteers, the platform ensures that the response to animal emergencies is swift and efficient.

Furthermore, to ensure the safety of the animals and the credibility of the response teams, we've implemented a thorough documentation process for onboarding NGOs and volunteers. They digitally sign necessary documents to confirm their roles and responsibilities. Once onboarded, they gain access to their personalized dashboards, where they can track incidents, manage tasks, and monitor progress. This ensures that every animal is attended to quickly and safely, with a trusted, well-coordinated team working to resolve the issue.


## Inspiration

In India, there's a critical need for coordinated animal rescue efforts. With millions of stray animals facing hardships daily, we recognized the gap between people who want to help and the organizations that can provide assistance. HopesAlive bridges this gap by creating a unified platform for reporting and managing animal rescue cases.

## What It Does

HopesAlive is a comprehensive platform that connects concerned citizens, volunteers, and NGOs to facilitate animal rescue operations:

- **Incident Reporting** - Users can easily report animal distress cases with photos and location details.
- **Smart Severity Assessment** - An AI-powered system evaluates the urgency of each case.
- **Real-time Tracking** - Monitor rescue operations from report to resolution.
- **Multi-role System** - Specialized dashboards for:
  - Citizens (Reporters)
  - Volunteers
  - NGO Organizations

## User Access

Users can log in in three ways: as a citizen, volunteer, or NGO.

### Sign Up


### Documentation with DocuSign

For volunteers and NGOs, we have integrated official documentation with DocuSign.
- Volunteers need to sign commitment documents upon registration.
- NGOs must sign operational agreements and compliance forms.
Upon clicking "Sign Document," users are redirected to the DocuSign page for e-signature.
Once completed, profiles are activated:

![NGO Registration](https://i.imgur.com/KmuAG7r.jpeg)
![NGO Documentation](https://i.imgur.com/iyPexqi.jpeg)

### Report Incidents
Reporting an incident is simple:

- Click "Report Incident" on the homepage.
- Provide details, upload images, and share the location.
- AI evaluates severity and assigns priority.
- Case is dispatched to volunteers or NGOs.
- Monitor rescue progress in real-time.



### What We Learned

- The importance of structured coordination between citizens, volunteers, and NGOs.
- How AI can enhance efficiency by assessing incident severity and prioritizing responses.
- The significance of digital documentation (DocuSign) in ensuring authenticity and accountability.

### Challenges Faced

- **Real-time Data Management** - Ensuring accurate and instant updates for all stakeholders.
- **AI Implementation** - Developing an effective severity assessment system required extensive testing.
- **User Engagement** - Encouraging active participation from citizens and volunteers.

### Future Plans

- **Mobile App Development** - Expanding HopesAlive to a mobile application for greater accessibility.
- **Expansion to More Cities** - Scaling operations to reach a wider audience across India.
- **Advanced AI Features** - Enhancing AI capabilities to predict distress-prone areas and optimize rescue efforts.
- **Crowdfunding Integration** - Allowing users to donate directly to animal rescue cases via the platform.

### Testing
For testing please use the following email and password:
- Ngo account:
   - Email: nac1@example.com
   - Password: 1234567
- Volunteer account:
   - Email: raj@example.com
   - Password: 123456


HopesAlive is dedicated to creating a more compassionate world for street animals. Join us in making a difference.




## 🛠️ Tech Stack  

**Frontend:**  
- React.js  
- Tailwind CSS  
- Daisy UI  

**Backend:**  
- Node.js  
- Express.js  
- JWT Authentication  
- MongoDB  
- DocuSign API

---

## ✨ Key Features  

**For Citizens:**  
- Upload a photo of an injured animal with location details.  
- Track the status of a reported incident.  

**For Volunteers:**  
- Dedicated dashboard to manage tasks.  
- Assign incidents to themselves for resolution.  
- Create new incidents if required.  

**For NGOs:**  
- Centralized dashboard displaying all city-wide incidents.  
- Update incident statuses (Pending, In Process, Resolved).  
- Access statistics and analytics for better management.  
- Dedicated city map for visualizing incidents.  

---

## 🚀 Getting Started Locally  

### 1. Clone the Repository  
```bash
git clone https://github.com/MadhavDhatrak/HopesAlive.git
cd HopesAlive
```
### 2. Configure Environment Variables
```bash 
Create a .env file in the root directory and include the following:

PORT=3000
MONGO_URI=your-mongodb-link
JWT_KEY=your-secret-key
```

### 3. Backend Setup
```bash 
cd backend
npm install
npm run start
```
Ensure all dependencies are installed. If errors occur, double-check your environment and installed packages.

### 4. Frontend Setup
```bash 
cd frontend
npm install
npm run dev
```

### 5. Launch the Application
Visit the following URL in your browser:
http://localhost:5173/
