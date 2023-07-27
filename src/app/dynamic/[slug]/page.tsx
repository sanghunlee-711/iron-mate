import React from 'react';

const Dynamic = ({ params }: { params: { slug: string } }) => {
  return <div>Dynamic : {params.slug}</div>;
};

export default Dynamic;
