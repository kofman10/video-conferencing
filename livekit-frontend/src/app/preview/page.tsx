'use client';
import {
  LocalUserChoices,
} from '@livekit/components-react';
import dynamic from 'next/dynamic';
import * as React from 'react';
import PageHeader from '@/layouts/partials/PageHeader';
import { useCreateRoomStore } from '@/hooks/useAPIStore';

const PreJoinNoSSR = dynamic(
  async () => {
    return (await import('@livekit/components-react')).PreJoin;
  },
  { ssr: false }
);

const Preview = () => {
  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
    undefined
  );
  const { createRoomData } = useCreateRoomStore.getState();
  
  localStorage.setItem('room', createRoomData.roomName);

  function handlePreJoinSubmit(values: LocalUserChoices) {
    setPreJoinChoices(values);
    console.log(preJoinChoices, ': prejoin choices');

    window.location.href = '/room'
  }
  return (
    <>
      <PageHeader />
      <section data-lk-theme="default">
          <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
            <PreJoinNoSSR
              onError={(err) => console.log('error while setting up prejoin', err)}
              defaults={{
                username: '',
                videoEnabled: true,
                audioEnabled: true,
              }}
              onSubmit={handlePreJoinSubmit}
            ></PreJoinNoSSR>
          </div>
      </section>
    </>
  );
};

export default Preview;
