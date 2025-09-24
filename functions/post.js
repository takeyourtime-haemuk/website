export async function handler(event, context) {
  const userAgent = event.headers['user-agent'] || '';
  let storeUrl = '';

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    storeUrl = 'https://apps.apple.com/app/id6747734534';
  } else if (/Android/i.test(userAgent)) {
    storeUrl = 'https://play.google.com/store/apps/details?id=com.haemuk';
  } else {
    storeUrl = 'https://haemuk.com'; // optional desktop fallback
  }

  return {
    statusCode: 302,
    headers: { Location: storeUrl },
  };
}
