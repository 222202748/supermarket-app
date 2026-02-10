const baseURL = 'http://localhost:5001/api';

async function testEndpoints() {
  try {
    console.log('Testing /products/featured...');
    const res1 = await fetch(`${baseURL}/products/featured`);
    if (!res1.ok) {
        const text = await res1.text();
        throw new Error(`${res1.status} ${res1.statusText}: ${text}`);
    }
    const data1 = await res1.json();
    console.log('✓ /products/featured passed');
  } catch (error) {
    console.error('✗ /products/featured failed:', error.message);
  }

  try {
    console.log('Testing /products?limit=8&sort=createdAt...');
    const res2 = await fetch(`${baseURL}/products?limit=8&sort=createdAt`);
    if (!res2.ok) {
        const text = await res2.text();
        throw new Error(`${res2.status} ${res2.statusText}: ${text}`);
    }
    const data2 = await res2.json();
    console.log('✓ /products passed');
  } catch (error) {
    console.error('✗ /products failed:', error.message);
  }

  try {
    console.log('Testing /categories...');
    const res3 = await fetch(`${baseURL}/categories`);
    if (!res3.ok) {
        const text = await res3.text();
        throw new Error(`${res3.status} ${res3.statusText}: ${text}`);
    }
    const data3 = await res3.json();
    console.log('✓ /categories passed');
  } catch (error) {
    console.error('✗ /categories failed:', error.message);
  }
}

testEndpoints();
