import React from 'react';

type JobFormProps = {
    job: Frontier.Job
};

export const JobForm = ({ job }: JobFormProps) => {
    return (
        <p style={{color: 'white'}}>
            Job Loaded: {job?.job.title}... let&apos;s go!
        </p>
    )
}
