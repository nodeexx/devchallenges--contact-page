<script lang="ts">
import * as Form from '$lib/browser/shadcn-svelte/components/ui/form';
import { Input } from '$lib/browser/shadcn-svelte/components/ui/input';
import { Textarea } from '$lib/browser/shadcn-svelte/components/ui/textarea';
import * as Select from '$lib/browser/shadcn-svelte/components/ui/select';
import { superForm } from 'sveltekit-superforms';
import { zodClient } from 'sveltekit-superforms/adapters';
import { formSchema } from '$lib/shared/core/schemas/contact-form';

const COMPANY_SIZES = [
  '50-100 employees',
  '101-500 employees',
  '501-1000 employees',
  '1000+ employees',
];

const SUBJECTS = [
  'Building Landing pages',
  'Building Websites',
  'Building Web apps',
  'Building Mobile apps',
  'Building Desktop apps',
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
  : {
      label: COMPANY_SIZES[0],
      value: COMPANY_SIZES[0],
    }; // : undefined;
$: selectedSubject = $formData.subject
  ? {
      label: $formData.subject,
      value: $formData.subject,
    }
  : {
      label: SUBJECTS[0],
      value: SUBJECTS[0],
    }; // : undefined;
</script>

<a href="#/">
  <img
    src="/images/contact-form-icon.svg"
    alt="Becv logo"
    draggable="false"
    class="h-[30px] w-[100px] select-none"
  />
</a>

<div class="flex flex-col items-center">
  <h1
    class="mt-[40px] max-w-[577px] text-center text-[48px] font-bold leading-tight text-challenge-white xl:text-[64px]"
  >
    Interested in our business pricing?
  </h1>

  <p
    class="max-w-[466px] pt-4 text-center text-[20px] font-medium leading-normal text-challenge-white xl:max-w-[641px] xl:text-[32px]"
  >
    Fill out the form to view details and we’ll contact you as soon as possible.
  </p>
</div>

<div class="flex w-full items-center justify-center">
  <form
    method="POST"
    use:enhance
    class="mt-[72px] flex flex-1 flex-col gap-6 rounded-3xl bg-challenge-white/20 p-[30px] pb-[107px] xl:max-w-[810px]"
  >
    <div class="flex w-full flex-col gap-6 lg:flex-row lg:gap-[18px]">
      <Form.Field {form} name="name" class="flex-1 space-y-[4px]">
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
            class="h-auto rounded-2xl px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black placeholder:text-challenge-gray"
          />
        </Form.Control>
        <Form.FieldErrors class="text-red-300" />
      </Form.Field>

      <!-- Company Email -->
      <Form.Field {form} name="companyEmail" class="flex-1 space-y-[4px]">
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
            class="h-auto rounded-2xl px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black placeholder:text-challenge-gray"
          />
        </Form.Control>
        <Form.FieldErrors class="text-red-300" />
      </Form.Field>
    </div>

    <div class="flex w-full flex-col gap-6 lg:flex-row lg:gap-[18px]">
      <!-- Company Size -->
      <Form.Field {form} name="companySize" class="flex-1 space-y-[4px]">
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
              class="h-auto rounded-2xl px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black"
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
      <Form.Field {form} name="subject" class="flex-1 space-y-[4px]">
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
              class="[svg]:opacity-100 h-auto rounded-2xl px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black"
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
    <Form.Field {form} name="message" class="space-y-[4px]">
      <Form.Control let:attrs>
        <Form.Label
          class="text-[14px] font-medium leading-normal text-challenge-white data-[fs-error]:text-red-300"
        >
          Message
        </Form.Label>
        <Textarea
          {...attrs}
          placeholder="Enter your message..."
          class="h-auto resize-none rounded-2xl px-[22px] py-[24px] text-[16px] font-semibold leading-normal text-challenge-black placeholder:text-challenge-gray"
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
