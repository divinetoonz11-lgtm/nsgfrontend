import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AssociateLayout from '@/components/AssociateLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton } from '@/components/SkeletonUI';
import DataTable from '@/components/DataTable';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function ReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'income';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, [currentTab]);

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  return (
    <AssociateLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reports</h1>
        <p className="text-muted-foreground">Detailed analytics and reporting for your business.</p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="income" className="rounded-lg">Income Report</TabsTrigger>
          <TabsTrigger value="team" className="rounded-lg">Team Report</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Income Breakdown</h3>
            {loading ? <TableSkeleton /> : (
              <DataTable 
                columns={[
                  { header: 'Date', accessorKey: 'date' },
                  { header: 'Type', accessorKey: 'type' },
                  { header: 'Amount', accessorKey: 'amount' },
                  { header: 'Status', accessorKey: 'status' },
                ]} 
                data={[]} 
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Team Members</h3>
            {loading ? <TableSkeleton /> : (
              <DataTable 
                columns={[
                  { header: 'Name', accessorKey: 'name' },
                  { header: 'Email', accessorKey: 'email' },
                  { header: 'Status', accessorKey: 'status' },
                  { header: 'Join Date', accessorKey: 'joinDate' },
                ]} 
                data={[]} 
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </AssociateLayout>
  );
}