<script>
	export let pw;
	import zxcvbn from 'zxcvbn';
	$: strength = zxcvbn(pw).score;
</script>

<div class="flex justify-between">
	<span class="text-base font-medium">Password Strength:</span>
	<span class="text-sm font-bold"
		>{strength == 0
			? 'Poor'
			: strength == 1
			? 'Weak'
			: strength == 2
			? 'Fair'
			: strength == 3
			? 'Strong'
			: 'Excellent'}</span
	>
</div>
<div class="w-full bg-gray-300 rounded-full h-3.5">
	<div
		class:w-[20%]={strength == 0}
		class:w-[40%]={strength == 1}
		class:w-[60%]={strength == 2}
		class:w-[80%]={strength == 3}
		class:w-[100%]={strength == 4}
		class:bg-[#FF0000]={strength == 0}
		class:bg-orange-500={strength == 1}
		class:bg-yellow-400={strength == 2}
		class:bg-[#ADFF2F]={strength == 3}
		class:bg-[#008000]={strength == 4}
		class="h-3.5 rounded-full"
	/>
</div>
