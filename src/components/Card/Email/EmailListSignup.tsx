import React, { useState } from 'react';
import { Container, Text, TextInput, Button } from '@mantine/core';
import classes from './EmailListSignup.module.css';

export default function EmailListSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setStatus('success');
            setMessage("Thanks for signing up. Check your inbox for your ebook!");
        } else {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error(error);
        setStatus('error');
        setMessage('An error occurred. Please try again later.');
    }
    };

    return (
        <Container size="xl" mt="xl" className={classes.subscribe}>
            <h2 className={classes.title}>Join Our Inner Circle</h2>
            <h3 className={classes.subtitle}>Get a free chapter from our e-book</h3>
            <div className={classes.contentWrapper}>
                <div className={classes.textSection}>
                    
                    <p className={classes.text}>
                        Get exclusive previews, behind-the-scenes insights on infamous cases, and rare facts about history's most notorious killers and victims.
                        As a member, you’ll receive a free chapter from our e-book, increased chances to win our exclusive t-shirt giveaways, and special discounts on merch.
                        Don't miss out on chilling details others don’t know about — join today and dive deeper into true crime!
                    </p>
                </div>
                <div className={classes.formSection}>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={classes.input}
                            type="email"
                        />
                        <Button 
                            type="submit"
                            disabled={status === 'loading'}
                            className={classes.button}
                            style={{ backgroundColor: 'red', color: 'white' }}
                            >
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                        </Button>
                        {status === 'success' && <Text color="white">{message}</Text>}
                        {status === 'error' && <Text color="red">{message}</Text>}
                    </form>
                </div>
            </div>
        </Container>
    );
}
