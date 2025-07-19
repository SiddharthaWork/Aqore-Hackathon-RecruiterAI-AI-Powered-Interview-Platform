"use client"
import React, { useEffect, useState } from 'react';

const TestPage = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testApi = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: "What is the capital of Nepal?" },
            ],
          }),
        });
        
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        
        const data = await res.json();
        setResponse(data.result);
      } catch (err) {
        setError(err.message);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div>
          <p className="font-semibold">API Response:</p>
          <p className="mt-2 p-4 bg-gray-100 rounded">{response}</p>
        </div>
      )}
    </div>
  );
};

export default TestPage;