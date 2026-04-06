import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Trophy, Star, Loader2 } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';
import { toast } from 'sonner';

export default function RewardPopup() {
  const { user, isAuthenticated } = useAuth();
  const [reward, setReward] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const checkRewards = async () => {
      try {
        const response = await apiServerClient.fetch(`/rewards/unseen/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const currentReward = data[0];
            const seenKey = `reward_seen_${currentReward.id}`;
            if (!localStorage.getItem(seenKey)) {
              setReward(currentReward);
              setIsOpen(true);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      }
    };

    checkRewards();
  }, [isAuthenticated, user?.id]);

  const handleClaim = async () => {
    if (!reward) return;
    setLoading(true);
    try {
      await apiServerClient.fetch(`/rewards/${reward.id}/claim`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      toast.success('Reward claimed successfully!');
      localStorage.setItem(`reward_seen_${reward.id}`, 'true');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to claim reward');
    } finally {
      setLoading(false);
    }
  };

  if (!reward) return null;

  const getIcon = () => {
    if (reward.type === 'Special') return <Star className="w-12 h-12 text-accent" />;
    if (reward.type === 'Monthly') return <Trophy className="w-12 h-12 text-primary" />;
    return <Gift className="w-12 h-12 text-primary" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) localStorage.setItem(`reward_seen_${reward.id}`, 'true');
    }}>
      <DialogContent className="sm:max-w-[425px] z-modal text-center">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-4">
            {getIcon()}
          </div>
          <DialogTitle className="text-2xl font-bold text-center">{reward.title}</DialogTitle>
          <div className="flex justify-center mt-2">
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
              {reward.type} Reward
            </Badge>
          </div>
          <DialogDescription className="pt-4 text-base text-foreground text-center">
            {reward.description}
            {reward.amount && <div className="mt-4 text-2xl font-bold text-primary">${reward.amount}</div>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 sm:justify-center">
          <Button onClick={handleClaim} disabled={loading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Claim Reward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}