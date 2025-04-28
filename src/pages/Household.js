import React, { useState } from 'react';
import IssueReport from '../components/IssueReport';
import EmergencyButton from '../components/EmergencyButton';

function Household({ user }) {
    const [messages, setMessages] = useState([
        { user: { name: 'Salatiso', unit: '' }, text: 'Checking power issue in Unit 3.', timestamp: new Date().toISOString() }
    ]);
    const [chatInput, setChatInput] = useState('');

    const handleEscalate = (issue) => {
        if (!user.isAdmin) {
            alert('Only Household Admins can escalate issues.');
            return;
        }
        // Mock escalation (replace with Firebase)
        const neighborhoodIssues = JSON.parse(localStorage.getItem('neighborhoodIssues') || '[]');
        neighborhoodIssues.push(issue);
        localStorage.setItem('neighborhoodIssues', JSON.stringify(neighborhoodIssues));
        alert('Issue escalated to Neighborhood!');
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        const newMessage = {
            user,
            text: chatInput,
            timestamp: new Date().toISOString()
        };
        setMessages([...messages, newMessage]);
        setChatInput('');
        // Save to Firebase later
    };

    return (
        <div>
            <header>
                <h1>Makhi - Household (No. {user.house})</h1>
                <p>Admin: {user.name} | 5/10 Units</p>
            </header>
            <EmergencyButton user={user} />
            <section>
                <h2>Household Communication</h2>
                <IssueReport user={user} onEscalate={handleEscalate} />
                <h3>Chat</h3>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <p key={index}>
                            {msg.user.name}{msg.user.unit ? ` (Unit ${msg.user.unit})` : ''}: {msg.text}
                        </p>
                    ))}
                </div>
                <form onSubmit={handleChatSubmit}>
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button type="submit">Send</button>
                </form>
            </section>
        </div>
    );
}

export default Household;
