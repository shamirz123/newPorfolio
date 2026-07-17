import React, { useRef, useState } from 'react';
// import '../styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

// Formspree form endpoint
const FORMSPREE_URL = 'https://formspree.io/f/xeeyakyb';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

const form = useRef<HTMLFormElement>(null);

const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const hasNameError = name === '';
    const hasEmailError = email === '';
    const hasMessageError = message === '';

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setMessageError(hasMessageError);

    if (hasNameError || hasEmailError || hasMessageError) {
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('FAILED...', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                required
                id="contact-name"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
              />
              <TextField
                required
                id="contact-email"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter your email or phone number" : ""}
              />
            </div>
            <TextField
              required
              id="contact-message"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
            />
            <Button
              variant="contained"
              endIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
              onClick={sendEmail}
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send'}
            </Button>

            {submitStatus === 'success' && (
              <p className="form-status success">Message sent! I'll get back to you soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="form-status error">Something went wrong. Please try again or email me directly.</p>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;