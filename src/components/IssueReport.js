import React, { useState } from 'react';

function IssueReport({ user, onEscalate }) {
    const [type, setType] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const issue = {
            type,
            details,
            user,
            timestamp: new Date().toISOString(),
            status: 'Pending'
        };
        // Mock storage (replace with Firebase)
        const issues = JSON.parse(localStorage.getItem('issues') || '[]');
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
        alert('Issue reported to Household Admin!');
        setType('');
        setDetails('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="" disabled>Select Issue</option>
                <option value="power">Power Outage</option>
                <option value="water">Water Issue</option>
                <option value="other">Other</option>
            </select>
            <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the issue (e.g., No power in Unit 3)"
                required
            />
            <button type="submit">Submit to Admin</button>
            {user.isAdmin && (
                <button type="button" onClick={() => onEscalate({ type, details, user })}>
                    Escalate to Neighborhood
                </button>
            )}
        </form>
    );
}

export default IssueReport;
