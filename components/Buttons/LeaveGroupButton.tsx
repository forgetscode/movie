import { useState } from 'react';
import leaveGroupByUser from '../../utils/mutations/leaveGroupByUser';
import { notifySuccess, notifyFailure } from '../Toast';

type Props = {
  userId: string;
  groupId: string;
};

const LeaveGroupButton: React.FC<Props> = ({ userId, groupId }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeave = async () => {
    setIsLeaving(true);
    try {
      await leaveGroupByUser(userId, groupId);
      notifySuccess("Group left.")
    } catch (error) {
      console.error(error);
      notifyFailure("Could not leave group.")
    }
    setIsLeaving(false);
  };

  return (
    <button
      className="formButton !bg-red-500"
      type="button"
      onClick={handleLeave}
      disabled={isLeaving}
    >
      {isLeaving ? 'Leaving Group...' : 'Leave Group'}
    </button>
  );
};

export default LeaveGroupButton;
