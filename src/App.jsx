import { useEffect, useState } from 'react';

import axios from 'axios';

function App() {
  const [profileData, setProfileDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          'https://randomuser.me/api/?page=1&results=1&seed=abc'
        );

        setProfileDate({
          firstName: data.results[0].name.first,
          lastName: data.results[0].name.last,
          image: data.results[0].picture.large,
          gender: data.results[0].gender,
          phone: data.results[0].phone,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <div className="bg-slate-800 h-screen flex items-center justify-center w-screen">
      <div className=" rounded flex gap-3 bg-slate-900 w-96 p-4  border border-black text-white">
        <div>
          <img src={profileData?.image} alt={profileData?.firstName} />
        </div>
        <div className="flex flex-col gap-2">
          <h2>
            {profileData?.firstName} {profileData?.lastName}
          </h2>
          <p>{profileData?.gender}</p>
          <pre>{profileData?.phone}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
