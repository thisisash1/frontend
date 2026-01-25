'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Zod 스키마로 폼 검증 정의
const formSchema = z.object({
  name: z.string()
    .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
    .max(50, { message: '이름은 50자 이하여야 합니다.' }),
  email: z.string()
    .email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  phone: z.string()
    .regex(/^[0-9\-]{10,}$/, { message: '유효한 전화번호 형식으로 입력해주세요.' })
    .optional()
    .or(z.literal('')),
  age: z.coerce.number()
    .min(18, { message: '나이는 18세 이상이어야 합니다.' })
    .max(120, { message: '나이는 120세 이하여야 합니다.' })
    .optional(),
  bio: z.string()
    .max(500, { message: '자기소개는 500자 이하여야 합니다.' })
    .optional()
    .or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export default function FormsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange', // 실시간 검증
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmittedData(data);
      toast.success('폼이 성공적으로 제출되었습니다!');
      reset();
    } catch (error) {
      toast.error('폼 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold">폼 예제</h1>
        <p className="text-muted-foreground">React Hook Form + Zod를 사용한 폼 검증 예제</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 폼 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>사용자 정보 폼</CardTitle>
              <CardDescription>모든 필드는 실시간으로 검증됩니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 이름 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* 이메일 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* 전화번호 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    placeholder="010-1234-5678"
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                {/* 나이 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="age">나이</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="30"
                    {...register('age')}
                    className={errors.age ? 'border-red-500' : ''}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age.message}</p>
                  )}
                </div>

                {/* 자기소개 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  <textarea
                    id="bio"
                    placeholder="자신을 소개해주세요"
                    {...register('bio')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.bio ? 'border-red-500' : ''
                    }`}
                    rows={4}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '제출 중...' : '제출'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 결과 표시 */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>검증 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p className="font-semibold">현재 검증 규칙:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>이름: 2~50자</li>
                  <li>이메일: 유효한 형식</li>
                  <li>전화: 숫자-형식 (선택)</li>
                  <li>나이: 18~120세 (선택)</li>
                  <li>자기소개: 500자 이하 (선택)</li>
                </ul>
              </div>

              {submittedData && (
                <div className="pt-4 border-t space-y-2">
                  <p className="font-semibold">제출된 데이터:</p>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
