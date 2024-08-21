import React, { useState } from 'react';
import { updatePrompt, setResults } from '../flux/actions';
import '../App.css'; // Ensure your CSS is imported

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [progress, setProgress] = useState(0); // Progress bar state

  const handleChange = (e) => {
    setPrompt(e.target.value);
    updatePrompt(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Show progress bar when fetch starts
    setProgress(20); // Start the progress bar

    // Simulate progress (you can adjust this based on your needs)
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 80 ? prev + 10 : prev));
    }, 500);

    const imageUrl = await fetchImageFromModel(prompt);
    if (imageUrl) {
      setImageSrc(imageUrl);
      setResults(imageUrl);
      setProgress(100); // Complete the progress bar
      clearInterval(progressInterval);
      setTimeout(() => setIsLoading(false), 400); // Hide progress bar after completion
    } else {
      console.error('Failed to generate image');
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {imageSrc && (
        <div className="image-container">
          <img src={imageSrc} alt="Generated" />
        </div>
      )}

      <input
        type="text"
        value={prompt}
       
        onChange={handleChange}
        placeholder="Enter your prompt"
        style={{ height: prompt.length > 0 ? 'auto' : 'initial' }} // Expand the height based on content
      />
      <button onClick={handleSubmit}>Submit</button>

      {isLoading && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default PromptInput;

async function fetchImageFromModel(prompt) {
  const apiKey = 'key-1GD6Y6KQ6gHUUPkXKLkTYqBD9GgJe9L5F6cmD5mDEri6sXVlrWepyxmvyQhDssaDfso5tL6rrepR9Eblcm6WAGnFMuKijCEu'; // Your API key
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      response_format: 'url'
    })
  };

  const url = 'https://api.getimg.ai/v1/stable-diffusion/text-to-image';

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Image Generation Response:', data);

    return data.url;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}
