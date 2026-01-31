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

// Zod 스키마
const formSchema = z.object({
  name: z.string()
    .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
    .max(50, { message: '이름은 50자 이하여야 합니다.' }),
  email: z.string()
    .email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  phone: z.string().optional(),
  age: z.number().optional(),
  bio: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function FormsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    bio: '',
  });

  // 검증 함수
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다.';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }
    if (formData.phone && !/^[0-9\-]{10,}$/.test(formData.phone)) {
      newErrors.phone = '유효한 전화번호 형식으로 입력해주세요.';
    }
    if (formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 120)) {
      newErrors.age = '나이는 18~120 사이여야 합니다.';
    }
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = '자기소개는 500자 이하여야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('입력값을 확인해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      const submitData: FormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        age: formData.age ? parseInt(formData.age) : undefined,
        bio: formData.bio || undefined,
      };

      setSubmittedData(submitData);
      toast.success('폼이 성공적으로 제출되었습니다!');
      setFormData({ name: '', email: '', phone: '', age: '', bio: '' });
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 이름 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* 이메일 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* 전화번호 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* 나이 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="age">나이</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="30"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={errors.age ? 'border-red-500' : ''}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </div>

                {/* 자기소개 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  <textarea
                    id="bio"
                    placeholder="자신을 소개해주세요"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.bio ? 'border-red-500' : ''
                    }`}
                    rows={4}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio}</p>
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
