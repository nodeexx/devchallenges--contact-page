<script lang="ts">
import * as Form from '$lib/browser/shadcn-svelte/components/ui/form';
import { Input } from '$lib/browser/shadcn-svelte/components/ui/input';
import { Textarea } from '$lib/browser/shadcn-svelte/components/ui/textarea';
import * as Select from '$lib/browser/shadcn-svelte/components/ui/select';
import { superForm } from 'sveltekit-superforms';
import { zodClient } from 'sveltekit-superforms/adapters';
import { formSchema } from '$lib/shared/core/schemas/contact-form';

const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
];

const SUBJECTS = [
  'Building a Landing page',
  'Building a Website',
  'Building a Web app',
  'Building a Mobile app',
  'Building a Desktop app',
];

export let data;

const form = superForm(data.form, {
  validators: zodClient(formSchema),
});

const { form: formData, enhance } = form;

$: selectedCompanySize = $formData.companySize
  ? {
      label: $formData.companySize,
      value: $formData.companySize,
    }
  : undefined;
$: selectedSubject = $formData.subject
  ? {
      label: $formData.subject,
      value: $formData.subject,
    }
  : undefined;
</script>

<a href="#/">
  <img
    src="/images/contact-form-icon.svg"
    alt="Becv logo"
    draggable="false"
    class="h-[30px] w-[100px] select-none"
  />
</a>

<h1
  class="mt-[40px] text-center text-[48px] font-bold leading-tight text-challenge-white"
>
  Interested in our business pricing?
</h1>

<p
  class="pt-4 text-center text-[20px] font-medium leading-normal text-challenge-white"
>
  Fill out the form to view details and we’ll contact you as soon as possible.
</p>

<div class="flex w-full items-center justify-center">
  <form
    method="POST"
    use:enhance
    class="mt-[72px] flex flex-1 flex-col gap-6 rounded-3xl bg-challenge-white/20 p-[30px] pb-[107px] xl:max-w-[810px]"
  >
    <div class="flex w-full flex-col gap-6 lg:flex-row lg:gap-[18px]">
      <Form.Field {form} name="name" class="flex-1">
        <!-- Name -->
        <Form.Control let:attrs>
          <Form.Label
            class="text-[14px] font-medium leading-normal text-challenge-white data-[fs-error]:text-red-300"
            >Name</Form.Label
          >
          <Input
            {...attrs}
            bind:value="{$formData.name}"
            placeholder="Ethan Jonson"
            class="px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black placeholder:text-challenge-gray"
          />
        </Form.Control>
        <Form.FieldErrors class="text-red-300" />
      </Form.Field>

      <!-- Company Email -->
      <Form.Field {form} name="companyEmail" class="flex-1">
        <Form.Control let:attrs>
          <Form.Label
            class="text-[14px] font-medium leading-normal text-challenge-white data-[fs-error]:text-red-300"
            >Company Email</Form.Label
          >
          <Input
            {...attrs}
            bind:value="{$formData.companyEmail}"
            type="email"
            placeholder="ethan@jonson.com"
            class="px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black placeholder:text-challenge-gray"
          />
        </Form.Control>
        <Form.FieldErrors class="text-red-300" />
      </Form.Field>
    </div>

    <div class="flex w-full flex-col gap-6 lg:flex-row lg:gap-[18px]">
      <!-- Company Size -->
      <Form.Field {form} name="companySize" class="flex-1">
        <Form.Control let:attrs>
          <Form.Label
            class="text-[14px] font-medium leading-normal text-challenge-white data-[fs-error]:text-red-300"
          >
            Company Size
          </Form.Label>
          <Select.Root
            selected="{selectedCompanySize}"
            onSelectedChange="{(v) => {
              v && ($formData.companySize = v.value);
            }}"
          >
            <Select.Trigger
              {...attrs}
              aria-label="Select your company's size"
              class="px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black"
            >
              <Select.Value
                placeholder="Select your company's size"
                class="data-[placeholder]:text-challenge-gray"
              />
            </Select.Trigger>
            <Select.Content>
              {#each COMPANY_SIZES as companySize}
                <Select.Item value="{companySize}" label="{companySize}" />
              {/each}
            </Select.Content>
          </Select.Root>
          <input
            hidden
            bind:value="{$formData.companySize}"
            name="{attrs.name}"
          />
        </Form.Control>
        <Form.FieldErrors class="text-red-300" />
      </Form.Field>

      <!-- Subject -->
      <Form.Field {form} name="subject" class="flex-1">
        <Form.Control let:attrs>
          <Form.Label
            class="text-[14px] font-medium leading-normal text-challenge-white data-[fs-error]:text-red-300"
            >Subject</Form.Label
          >
          <Select.Root
            selected="{selectedSubject}"
            onSelectedChange="{(v) => {
              v && ($formData.subject = v.value);
            }}"
          >
            <Select.Trigger
              {...attrs}
              class="[svg]:opacity-100 px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black"
            >
              <Select.Value
                placeholder="Select a subject"
                class="data-[placeholder]:text-challenge-gray"
              />
            </Select.Trigger>
            <Select.Content>
              {#each SUBJECTS as subject}
                <Select.Item value="{subject}" label="{subject}" />
              {/each}
            </Select.Content>
          </Select.Root>
          <input hidden bind:value="{$formData.subject}" name="{attrs.name}" />
        </Form.Control>
        <Form.FieldErrors class="text-red-300" />
      </Form.Field>
    </div>

    <!-- Message -->
    <Form.Field {form} name="message" class="space-y-[5px]">
      <Form.Control let:attrs>
        <Form.Label
          class="text-[14px] font-medium leading-normal text-challenge-white data-[fs-error]:text-red-300"
        >
          Message
        </Form.Label>
        <Textarea
          {...attrs}
          placeholder="Enter your message..."
          class="resize-none px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black placeholder:text-challenge-gray"
          bind:value="{$formData.message}"
        />
      </Form.Control>
      <Form.FieldErrors class="text-red-300" />
    </Form.Field>

    <Form.Button
      class="h-auto w-full rounded-2xl bg-challenge-white px-[194px] py-[24px] text-[20px] font-bold leading-normal text-challenge-purple hover:bg-challenge-white hover:text-challenge-purple"
    >
      Contact Sales
    </Form.Button>
  </form>
</div>

<style lang="postcss">
form :global([data-select-trigger] svg) {
  @apply h-6 w-6 opacity-100;
}
</style>
