"use client";

import { Container } from '@mantine/core';
import './TermsOfService.module.css';

export default function TermsOfService() {
    return (
        <Container size="xl" mt="xl">
            <h1 className="terms-title">Terms of Service</h1>

            <section className="terms-section">
                <h2 className="terms-heading">1. Introduction</h2>
                <p className="terms-text">
                    Welcome to <em>They Will Kill You</em>. These Terms of Service ("Terms") govern your access to and use of the website operated by Bored Badger LLC. By using this site, you agree to comply with these Terms. If you do not agree to these Terms, please refrain from using the site.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">2. Use of Content</h2>
                <p className="terms-text">
                    All content on <em>They Will Kill You</em> is provided for informational purposes only. The content is the intellectual property of Bored Badger LLC and is protected under copyright law. You are prohibited from redistributing, modifying, or using the content for commercial purposes without written permission from Bored Badger LLC.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">3. Third-Party Services</h2>
                <p className="terms-text">
                    The site uses third-party services, including Google Analytics, Google Ads, PayPal, and Shopify. By using the site, you acknowledge and agree to the terms and policies of these third-party providers. Bored Badger LLC is not responsible for the practices or content of third-party services.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">4. Intellectual Property</h2>
                <p className="terms-text">
                    All articles, images, and other materials on <em>They Will Kill You</em> are owned by Bored Badger LLC. Unauthorized use of any material may result in legal action. You must not use any part of the content for commercial purposes without obtaining a license to do so from Bored Badger LLC.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">5. Disclaimer of Warranties</h2>
                <p className="terms-text">
                    The content provided on <em>They Will Kill You</em> is "as is," without warranties of any kind, either expressed or implied. Bored Badger LLC does not warrant the accuracy, reliability, or completeness of the content. The company makes no guarantees that the site will be error-free, secure, or free from viruses.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">6. Limitation of Liability</h2>
                <p className="terms-text">
                    Bored Badger LLC will not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of the site. This includes but is not limited to damages from loss of data, revenue, or profits arising out of your use or inability to use the site or its content.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">7. Dispute Resolution</h2>
                <p className="terms-text">
                    Any disputes arising out of the use of the site will be resolved through mediation and, if necessary, arbitration under U.S. law. By using the site, you agree that any legal action will be conducted in the jurisdiction of Bored Badger LLC.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">8. Governing Law</h2>
                <p className="terms-text">
                    These Terms are governed by the laws of the United States and the jurisdiction in which Bored Badger LLC operates. Any legal disputes related to these Terms will be resolved in the appropriate U.S. courts.
                </p>
            </section>

            <section className="terms-section">
                <h2 className="terms-heading">9. Modifications</h2>
                <p className="terms-text">
                    Bored Badger LLC reserves the right to update or modify these Terms at any time without prior notice. It is your responsibility to review these Terms periodically to stay informed about any changes.
                </p>
            </section>
        </Container>
    );
};
